<?php

namespace App\Models;

use CodeIgniter\Model;

class UsuarioModel extends Model
{
    protected $table         = 'users';
    protected $primaryKey    = 'id_user';
    protected $returnType    = 'object';
    protected $allowedFields = ['nombres_apellidos', 'username', 'password', 'tipo', 'estado_usuario'];

    /**
     * Genera el hash seguro de una contraseña (Argon2id, o bcrypt si el
     * servidor no tiene soporte para Argon2).
     */
    public static function hashPassword(string $password): string
    {
        return password_hash($password, self::algoritmo());
    }

    /**
     * Busca un usuario activo con las credenciales dadas.
     *
     * Las contraseñas heredadas en MD5 se aceptan una única vez y se
     * reemplazan por un hash seguro en ese mismo inicio de sesión.
     */
    public function checkLogin(string $username, string $password): ?object
    {
        $usuario = $this->where('username', $username)
            ->where('estado_usuario', 1)
            ->first();

        if ($usuario === null) {
            // Igualar el tiempo de respuesta para no revelar si el usuario existe.
            password_verify($password, self::hashPassword('dummy'));

            return null;
        }

        $hashGuardado = (string) $usuario->password;

        if (password_verify($password, $hashGuardado)) {
            if (password_needs_rehash($hashGuardado, self::algoritmo())) {
                $this->actualizarPassword((int) $usuario->id_user, $password);
            }

            return $usuario;
        }

        if ($this->esHashMd5($hashGuardado) && hash_equals(strtolower($hashGuardado), md5($password))) {
            $this->actualizarPassword((int) $usuario->id_user, $password);

            return $usuario;
        }

        return null;
    }

    public function actualizarPassword(int $idUser, string $password): bool
    {
        return $this->update($idUser, ['password' => self::hashPassword($password)]);
    }

    public function getFullName(int $idUser): string
    {
        $usuario = $this->select('nombres_apellidos')->find($idUser);

        return $usuario->nombres_apellidos ?? '';
    }

    private static function algoritmo(): string
    {
        return defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT;
    }

    private function esHashMd5(string $hash): bool
    {
        return preg_match('/^[a-f0-9]{32}$/i', $hash) === 1;
    }
}

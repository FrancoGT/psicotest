/**
 * PsicoTest - Pantalla de inicio de sesión (Ext JS 7, classic).
 */
Ext.onReady(function () {
    var cfg = window.PSICOTEST;

    Ext.tip.QuickTipManager.init();

    /**
     * Las imágenes no tienen tamaño hasta que cargan: recalcular el layout entonces.
     */
    function relayoutAlCargar(cmp) {
        var img = cmp.el.down('img');

        if (img) {
            img.on('load', function () {
                Ext.ComponentQuery.query('viewport')[0].updateLayout();
            });
        }
    }

    function enviar() {
        var form = Ext.getCmp('loginForm'),
            basic = form.getForm(),
            aviso = Ext.getCmp('loginAviso');

        aviso.hide();

        if (!basic.isValid()) {
            return;
        }

        basic.submit({
            url: cfg.siteUrl + 'login',
            method: 'POST',
            waitMsg: 'Verificando credenciales...',
            success: function (f, action) {
                window.location.href = action.result.redirect || (cfg.siteUrl + 'dashboard');
            },
            failure: function (f, action) {
                var result = action.result || {},
                    msg;

                if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                    msg = result.msg;
                } else {
                    msg = 'No se pudo conectar con el servidor. Intente nuevamente.';
                }

                if (msg) {
                    aviso.update('<b>ERROR</b> ' + Ext.String.htmlEncode(msg));
                    aviso.show();
                }

                basic.findField('password').reset();
                basic.findField(result.errors && result.errors.username ? 'username' : 'password').focus();
            }
        });
    }

    var LOGIN_APILADO = 640;

    function ajustarLogin() {
        var panel = Ext.getCmp('loginPanel'),
            apilar = Ext.Element.getViewportWidth() < LOGIN_APILADO,
            layout = panel.getLayout();

        if (panel.apilado !== apilar) {
            panel.apilado = apilar;
            layout.setVertical(apilar);
            panel.toggleCls('psico-login-stacked', apilar);
            panel.updateLayout();
        }
    }

    Ext.on('resize', function () { ajustarLogin(); }, null, { buffer: 60 });

    var alPresionarEnter = function (field, e) {
        if (e.getKey() === e.ENTER) {
            enviar();
        }
    };

    Ext.create('Ext.container.Viewport', {
        cls: 'psico-login-viewport',
        layout: 'center',
        scrollable: true,
        items: [{
            xtype: 'container',
            width: '95%',
            maxWidth: 760,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'component',
                cls: 'psico-login-logo',
                margin: '0 0 20 0',
                html: '<img src="' + cfg.baseUrl + 'assets/images/logo.png" alt="PsicoTest">',
                listeners: { afterrender: relayoutAlCargar }
            }, {
                xtype: 'panel',
                id: 'loginPanel',
                cls: 'psico-login-panel',
                border: true,
                // Imagen y formulario lado a lado; en pantallas estrechas se apilan
                // (ver ajustarLogin) para que el formulario no quede aplastado.
                layout: {
                    type: 'box',
                    vertical: Ext.Element.getViewportWidth() < LOGIN_APILADO,
                    align: 'stretch'
                },
                listeners: {
                    afterrender: function (panel) {
                        panel.apilado = panel.getLayout().getVertical();
                        panel.toggleCls('psico-login-stacked', panel.apilado);
                    }
                },
                items: [{
                    xtype: 'component',
                    flex: 1,
                    padding: 20,
                    cls: 'psico-login-img',
                    html: '<img src="' + cfg.baseUrl + 'assets/images/asistenciapsico.PNG" alt="imagen">',
                    listeners: { afterrender: relayoutAlCargar }
                }, {
                    xtype: 'form',
                    id: 'loginForm',
                    flex: 1,
                    bodyPadding: '10 25 10 25',
                    border: false,
                    defaults: {
                        xtype: 'textfield',
                        anchor: '100%',
                        labelAlign: 'top',
                        msgTarget: 'under',
                        allowBlank: false,
                        inputAttrTpl: 'autocomplete="off"',
                        listeners: { specialkey: alPresionarEnter }
                    },
                    items: [{
                        xtype: 'component',
                        cls: 'psico-login-title',
                        html: 'Iniciar Sesión'
                    }, {
                        xtype: 'component',
                        id: 'loginAviso',
                        cls: 'psico-alert psico-alert-danger',
                        hidden: true
                    }, {
                        name: 'username',
                        fieldLabel: 'Usuario',
                        emptyText: 'Usuario',
                        blankText: 'Usuario debe ser ingresado!!!'
                    }, {
                        name: 'password',
                        inputType: 'password',
                        fieldLabel: 'Contraseña',
                        emptyText: 'Contraseña',
                        blankText: 'Contraseña debe ser ingresado!!!'
                    }],
                    buttonAlign: 'center',
                    buttons: [{
                        text: 'Entrar',
                        scale: 'medium',
                        handler: enviar
                    }],
                    listeners: {
                        afterrender: function (form) {
                            Ext.defer(function () {
                                form.getForm().findField('username').focus();
                            }, 100);
                        }
                    }
                }]
            }]
        }]
    });
});

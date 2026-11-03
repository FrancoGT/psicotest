/**
 * PsicoTest - Aplicación principal (Ext JS 7, classic).
 *
 * Secciones:
 *   - dashboard : Página principal
 *   - pruebas   : Buscador de pruebas psicológicas
 */
(function () {
    // Sin 'use strict': callParent() de Ext JS no funciona en modo estricto.
    var cfg = window.PSICOTEST,
        RUTAS = {
            dashboard: 'dashboard',
            pruebas: 'prueba_psicologica'
        };

    /* ------------------------------------------------------------------
     * Modelo
     * ------------------------------------------------------------------ */
    Ext.define('PsicoTest.model.Prueba', {
        extend: 'Ext.data.Model',
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'link_test', type: 'string' },
            { name: 'anio_publicacion', type: 'int' },
            { name: 'tipo', type: 'string' },
            { name: 'rango_aplicacion', type: 'string' },
            { name: 'virtualizado', type: 'string' }
        ]
    });

    /* ------------------------------------------------------------------
     * Página principal
     * ------------------------------------------------------------------ */
    Ext.define('PsicoTest.view.Dashboard', {
        extend: 'Ext.panel.Panel',
        xtype: 'psico-dashboard',

        title: 'Página Principal',
        bodyPadding: 20,
        scrollable: true,

        initComponent: function () {
            this.items = [{
                xtype: 'component',
                cls: 'psico-card',
                html: '<h3>Bienvenido(a)</h3>' +
                    (cfg.usuario ? '<p>' + Ext.String.htmlEncode(cfg.usuario) + '</p>' : '')
            }];
            this.callParent();
        }
    });

    /* ------------------------------------------------------------------
     * Buscador de pruebas psicológicas
     * ------------------------------------------------------------------ */
    Ext.define('PsicoTest.view.Pruebas', {
        extend: 'Ext.panel.Panel',
        xtype: 'psico-pruebas',

        title: 'Buscador de Consultas Psicológicas',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        bodyPadding: 15,
        scrollable: 'y',

        initComponent: function () {
            var me = this;

            me.store = Ext.create('Ext.data.Store', {
                model: 'PsicoTest.model.Prueba',
                pageSize: 10,
                remoteSort: true,
                remoteFilter: true,
                proxy: {
                    type: 'memory',
                    enablePaging: true,
                    reader: { type: 'json' }
                }
            });

            me.items = [{
                xtype: 'form',
                itemId: 'formBuscar',
                title: 'Ingrese los datos para realizar la búsqueda',
                ui: 'default',
                bodyPadding: 15,
                margin: '0 0 15 0',
                layout: {
                    type: 'column'
                },
                defaults: {
                    labelAlign: 'top',
                    columnWidth: 0.5,
                    padding: '0 10 5 0',
                    msgTarget: 'under'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'nombre',
                    fieldLabel: 'Nombre',
                    emptyText: 'Ingrese un nombre para buscar ...',
                    columnWidth: 1,
                    listeners: {
                        specialkey: function (f, e) {
                            if (e.getKey() === e.ENTER) {
                                me.buscar();
                            }
                        }
                    }
                }, {
                    xtype: 'combobox',
                    name: 'tipo',
                    fieldLabel: 'Tipo de test',
                    emptyText: 'Seleccione un tipo de test',
                    allowBlank: false,
                    blankText: 'Seleccione un tipo de test',
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    store: [
                        'Prueba de Aptitud',
                        'Prueba de Desarrollo Infantil y Preescolar',
                        'Prueba de Personalidad y Ajuste',
                        'Prueba de Rendimiento'
                    ]
                }, {
                    xtype: 'combobox',
                    name: 'rango_aplicacion',
                    fieldLabel: 'Rango de aplicación',
                    emptyText: 'Seleccione un rango de edad',
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    store: [
                        ['10 - 18', '10 - 18 años'],
                        ['18 - 25', '18 - 25 años'],
                        ['5 - 9', '5 - 9 años']
                    ],
                    triggers: {
                        limpiar: {
                            cls: 'x-form-clear-trigger',
                            handler: function () { this.clearValue(); }
                        }
                    }
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: 'Test Virtualizado',
                    columnWidth: 1,
                    columns: 2,
                    width: 260,
                    items: [
                        { boxLabel: 'N', name: 'virtualizado', inputValue: 'N' },
                        { boxLabel: 'Y', name: 'virtualizado', inputValue: 'Y' }
                    ]
                }],
                buttonAlign: 'left',
                buttons: [{
                    text: 'Buscar',
                    scale: 'medium',
                    handler: function () { me.buscar(); }
                }, {
                    text: 'Limpiar',
                    scale: 'medium',
                    handler: function () { me.limpiar(); }
                }]
            }, {
                xtype: 'grid',
                itemId: 'gridResultados',
                title: 'Resultados',
                hidden: true,
                minHeight: 260,
                flex: 1,
                store: me.store,
                columnLines: true,
                emptyText: 'No se encontraron resultados',
                viewConfig: {
                    deferEmptyText: false,
                    enableTextSelection: true
                },
                columns: [{
                    text: 'Link Test',
                    dataIndex: 'link_test',
                    flex: 2,
                    minWidth: 200,
                    renderer: me.renderLink
                }, {
                    text: 'Año de Publicación',
                    dataIndex: 'anio_publicacion',
                    width: 150,
                    align: 'center'
                }, {
                    text: 'Tipo',
                    dataIndex: 'tipo',
                    flex: 1,
                    minWidth: 180,
                    renderer: Ext.util.Format.htmlEncode
                }, {
                    text: 'Rango de Aplicación',
                    dataIndex: 'rango_aplicacion',
                    width: 160,
                    align: 'center',
                    renderer: Ext.util.Format.htmlEncode
                }, {
                    text: 'Virtualizado',
                    dataIndex: 'virtualizado',
                    width: 110,
                    align: 'center',
                    renderer: Ext.util.Format.htmlEncode
                }],
                tbar: [{
                    xtype: 'textfield',
                    itemId: 'filtroLocal',
                    emptyText: 'Filtrar resultados...',
                    width: 260,
                    triggers: {
                        limpiar: {
                            cls: 'x-form-clear-trigger',
                            handler: function () { this.setValue(''); }
                        }
                    },
                    listeners: {
                        change: {
                            buffer: 300,
                            fn: function (f, value) { me.filtrar(value); }
                        }
                    }
                }],
                bbar: {
                    xtype: 'pagingtoolbar',
                    displayInfo: true
                }
            }];

            me.callParent();
        },

        renderLink: function (value) {
            var url = Ext.String.trim(value || ''),
                safe = Ext.String.htmlEncode(url);

            // Solo se enlazan URLs http(s) para evitar javascript: u otros esquemas.
            if (/^https?:\/\//i.test(url)) {
                return '<a href="' + safe + '" target="_blank" rel="noopener noreferrer">' + safe + '</a>';
            }

            return safe;
        },

        buscar: function () {
            var me = this,
                form = me.down('#formBuscar').getForm(),
                grid = me.down('#gridResultados');

            if (!form.isValid()) {
                return;
            }

            var valores = form.getValues(false, false, false, false);

            me.setLoading('Buscando...');

            Ext.Ajax.request({
                url: cfg.siteUrl + 'prueba_psicologica/buscar',
                method: 'POST',
                jsonData: {
                    nombre: valores.nombre || '',
                    tipo: valores.tipo || '',
                    rango_aplicacion: valores.rango_aplicacion || '',
                    virtualizado: valores.virtualizado || ''
                },
                success: function (response) {
                    var datos = Ext.decode(response.responseText, true) || [];

                    me.store.getProxy().setData(datos);
                    me.down('#filtroLocal').setValue('');
                    me.store.clearFilter(true);
                    me.store.loadPage(1);

                    grid.setTitle('Resultados (' + datos.length + ')');
                    grid.show();
                },
                failure: function (response) {
                    if (response.status !== 401) {
                        Ext.Msg.alert('Error', 'No se pudo realizar la búsqueda. Intente nuevamente.');
                    }
                },
                callback: function () {
                    me.setLoading(false);
                }
            });
        },

        filtrar: function (texto) {
            var store = this.store,
                q = Ext.String.trim(texto || '').toLowerCase();

            if (!q) {
                store.removeFilter('busquedaLocal');
                return;
            }

            store.addFilter({
                id: 'busquedaLocal',
                filterFn: function (rec) {
                    return ['link_test', 'anio_publicacion', 'tipo', 'rango_aplicacion', 'virtualizado']
                        .some(function (campo) {
                            return String(rec.get(campo)).toLowerCase().indexOf(q) !== -1;
                        });
                }
            });
        },

        limpiar: function () {
            var grid = this.down('#gridResultados');

            this.down('#formBuscar').getForm().reset();
            this.store.getProxy().setData([]);
            this.store.removeAll();
            grid.hide();
        }
    });

    /* ------------------------------------------------------------------
     * Contenedor principal
     * ------------------------------------------------------------------ */
    Ext.define('PsicoTest.view.Main', {
        extend: 'Ext.container.Viewport',

        layout: 'border',

        initComponent: function () {
            var me = this;

            me.items = [{
                region: 'north',
                xtype: 'toolbar',
                cls: 'psico-topbar',
                height: 64,
                items: [{
                    xtype: 'component',
                    cls: 'psico-brand',
                    html: '<a href="' + cfg.siteUrl + RUTAS.dashboard + '">' +
                        '<img src="' + cfg.baseUrl + 'assets/images/logo-icon.png" alt="PsicoTest">' +
                        '<img src="' + cfg.baseUrl + 'assets/images/logo-text-light.png" alt="PsicoTest" class="psico-brand-text">' +
                        '</a>',
                    listeners: {
                        click: {
                            element: 'el',
                            delegate: 'a',
                            preventDefault: true,
                            fn: function () { me.irA('dashboard'); }
                        }
                    }
                }, '->', {
                    xtype: 'button',
                    cls: 'psico-user-btn',
                    text: '<img src="' + cfg.baseUrl + 'assets/images/users/1.jpg" alt="" class="psico-avatar">' +
                        Ext.String.htmlEncode(cfg.usuario || ''),
                    menu: [{
                        text: 'Cerrar Sesión',
                        handler: function () { me.cerrarSesion(); }
                    }]
                }]
            }, {
                region: 'west',
                xtype: 'panel',
                cls: 'psico-sidebar',
                width: 230,
                split: true,
                collapsible: true,
                collapseMode: 'mini',
                header: false,
                collapsed: Ext.Element.getViewportWidth() < 768,
                items: [{
                    xtype: 'dataview',
                    itemId: 'nav',
                    cls: 'psico-nav',
                    itemSelector: 'div.psico-nav-item',
                    selectedItemCls: 'psico-nav-item-selected',
                    overItemCls: 'psico-nav-item-over',
                    singleSelect: true,
                    tpl: [
                        '<tpl for=".">',
                        '<div class="psico-nav-item">',
                        '<span class="psico-nav-icon">{icono}</span>{texto}',
                        '</div>',
                        '</tpl>'
                    ],
                    store: {
                        fields: ['id', 'texto', 'icono'],
                        data: [
                            { id: 'dashboard', texto: 'Principal', icono: '&#9632;' },
                            { id: 'pruebas', texto: 'Pruebas Psicológicas', icono: '&#9776;' },
                            { id: 'logout', texto: 'Cerrar Sesión', icono: '&#9099;' }
                        ]
                    },
                    listeners: {
                        itemclick: function (view, rec) {
                            if (rec.getId() === 'logout') {
                                me.cerrarSesion();
                                return false;
                            }
                            me.irA(rec.getId());
                        }
                    }
                }]
            }, {
                region: 'center',
                xtype: 'container',
                itemId: 'contenido',
                layout: 'card',
                items: [
                    { xtype: 'psico-dashboard', itemId: 'dashboard' },
                    { xtype: 'psico-pruebas', itemId: 'pruebas' }
                ]
            }];

            me.callParent();
        },

        /**
         * Cambia de sección y sincroniza la URL del navegador.
         */
        irA: function (seccion, desdeHistorial) {
            if (!RUTAS[seccion]) {
                seccion = 'dashboard';
            }

            var nav = this.down('#nav');

            this.down('#contenido').getLayout().setActiveItem(seccion);
            nav.getSelectionModel().select(nav.getStore().getById(seccion), false, true);

            if (!desdeHistorial && window.history && window.history.pushState) {
                window.history.pushState({ seccion: seccion }, '', cfg.siteUrl + RUTAS[seccion]);
            }
        },

        cerrarSesion: function () {
            window.location.href = cfg.siteUrl + 'logout';
        }
    });

    /* ------------------------------------------------------------------
     * Arranque
     * ------------------------------------------------------------------ */
    Ext.onReady(function () {
        Ext.tip.QuickTipManager.init();

        // Sesión expirada en cualquier petición AJAX -> volver al login.
        Ext.Ajax.on('requestexception', function (conn, response) {
            if (response && response.status === 401) {
                Ext.Msg.alert('Sesión expirada', 'Su sesión ha expirado. Inicie sesión nuevamente.', function () {
                    window.location.href = cfg.siteUrl + 'login';
                });
            }
        });

        var main = Ext.create('PsicoTest.view.Main'),
            inicial = cfg.seccion || 'dashboard';

        main.irA(inicial, true);

        if (window.history && window.history.replaceState) {
            window.history.replaceState({ seccion: inicial }, '', window.location.href);
        }

        window.addEventListener('popstate', function (e) {
            main.irA((e.state && e.state.seccion) || 'dashboard', true);
        });
    });
}());

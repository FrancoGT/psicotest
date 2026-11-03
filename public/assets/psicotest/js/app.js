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
        bodyCls: 'psico-page-body',
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
        bodyCls: 'psico-page-body',

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
                // Distribución fluida con CSS Grid (ver .psico-form-grid en psicotest.css):
                // las columnas se reorganizan solas según el ancho disponible.
                layout: 'auto',
                bodyCls: 'psico-form-grid',
                defaults: {
                    labelAlign: 'top',
                    msgTarget: 'under'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'nombre',
                    fieldLabel: 'Nombre',
                    emptyText: 'Ingrese un nombre para buscar ...',
                    cls: 'psico-span-full',
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
                    cls: 'psico-span-full psico-fit-content',
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
                // Con muchas columnas, los minWidth de cada columna fuerzan el
                // desplazamiento horizontal dentro de la propia tabla en lugar de comprimirla.
                tbar: [{
                    xtype: 'textfield',
                    itemId: 'filtroLocal',
                    emptyText: 'Filtrar resultados...',
                    flex: 1,
                    minWidth: 140,
                    maxWidth: 300,
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
                    displayInfo: true,
                    // En pantallas estrechas los controles quedan accesibles con flechas
                    overflowHandler: 'scroller'
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
    var BREAKPOINT_MOVIL = 768,
        BREAKPOINT_TABLET = 1024;

    function calcularModo() {
        var w = Ext.Element.getViewportWidth();

        return w < BREAKPOINT_MOVIL ? 'movil' : (w < BREAKPOINT_TABLET ? 'tablet' : 'escritorio');
    }

    Ext.define('PsicoTest.view.Main', {
        extend: 'Ext.container.Viewport',

        layout: 'border',
        cls: 'psico-app',

        initComponent: function () {
            var me = this,
                modo = calcularModo(),
                movil = modo === 'movil';

            me.modo = modo;

            // Un único store alimenta el menú lateral y el menú desplegable móvil.
            me.navStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'texto', 'icono', 'separado'],
                data: [
                    { id: 'dashboard', texto: 'Principal', icono: 'fa-home' },
                    { id: 'pruebas', texto: 'Pruebas Psicológicas', icono: 'fa-clipboard-list' },
                    { id: 'logout', texto: 'Cerrar Sesión', icono: 'fa-sign-out-alt', separado: true }
                ]
            });

            me.items = [{
                region: 'north',
                xtype: 'toolbar',
                itemId: 'topbar',
                cls: 'psico-topbar',
                height: 60,
                items: [{
                    xtype: 'button',
                    itemId: 'btnMenu',
                    cls: 'psico-hamburger',
                    iconCls: 'fas fa-bars',
                    tooltip: 'Menú',
                    ariaLabel: 'Abrir menú de navegación',
                    hidden: !movil,
                    handler: function () { me.alternarMenu(); }
                }, {
                    xtype: 'component',
                    cls: 'psico-brand',
                    html: '<a href="' + cfg.siteUrl + RUTAS.dashboard + '">' +
                        '<svg class="psico-brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="PsicoTest">' +
                            '<path d="M11 22H5.5a1 1 0 0 1 0-5h4.501"/>' +
                            '<path d="m21 22-1.879-1.878"/>' +
                            '<path d="M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8"/>' +
                            '<circle cx="17" cy="18" r="3"/>' +
                        '</svg>' +
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
                }, {
                    xtype: 'component',
                    itemId: 'sepTitulo',
                    cls: 'psico-topbar-sep',
                    hidden: movil
                }, {
                    // flex + minWidth 0: el título ocupa el espacio libre y pasa a
                    // dos líneas en lugar de desbordar el header.
                    xtype: 'component',
                    cls: 'psico-topbar-title',
                    flex: 1,
                    minWidth: 0,
                    html: 'Sistema de Pruebas Psicológicas'
                }, {
                    xtype: 'button',
                    cls: 'psico-user-btn',
                    tooltip: Ext.String.htmlEncode(cfg.usuario || ''),
                    text: '<img src="' + cfg.baseUrl + 'assets/images/users/1.jpg" alt="" class="psico-avatar">' +
                        '<span class="psico-user-name">' + Ext.String.htmlEncode(cfg.usuario || '') + '</span>',
                    menu: [{
                        text: 'Cerrar Sesión',
                        iconCls: 'fas fa-sign-out-alt',
                        handler: function () { me.cerrarSesion(); }
                    }]
                }]
            }, {
                region: 'west',
                xtype: 'panel',
                itemId: 'sidebar',
                cls: 'psico-sidebar',
                width: modo === 'tablet' ? 200 : 240,
                minWidth: 180,
                maxWidth: 320,
                split: true,
                collapsible: true,
                collapseMode: 'mini',
                header: false,
                hidden: movil,
                scrollable: 'y',
                items: [me.crearNav('nav')]
            }, {
                region: 'center',
                xtype: 'container',
                itemId: 'contenido',
                cls: 'psico-content',
                layout: 'card',
                items: [
                    { xtype: 'psico-dashboard', itemId: 'dashboard' },
                    { xtype: 'psico-pruebas', itemId: 'pruebas' }
                ]
            }];

            me.callParent();

            // Menú lateral desplegable para móviles (se superpone al contenido).
            me.drawer = Ext.create('Ext.panel.Panel', {
                floating: true,
                shadow: false,
                hidden: true,
                header: false,
                border: false,
                cls: 'psico-sidebar psico-drawer',
                scrollable: 'y',
                items: [me.crearNav('navMovil')]
            });

            me.drawerMask = Ext.getBody().createChild({ cls: 'psico-drawer-mask' });
            me.drawerMask.on('click', me.cerrarMenu, me);

            Ext.on('resize', me.aplicarModo, me, { buffer: 60 });
        },

        crearNav: function (itemId) {
            var me = this;

            return {
                xtype: 'dataview',
                itemId: itemId,
                cls: 'psico-nav',
                itemSelector: 'div.psico-nav-item',
                selectedItemCls: 'psico-nav-item-selected',
                overItemCls: 'psico-nav-item-over',
                singleSelect: true,
                tpl: [
                    '<div class="psico-nav-section">Navegación</div>',
                    '<tpl for=".">',
                    '<tpl if="separado"><div class="psico-nav-divider"></div></tpl>',
                    '<div class="psico-nav-item">',
                    '<i class="psico-nav-icon fas {icono}"></i><span class="psico-nav-text">{texto}</span>',
                    '</div>',
                    '</tpl>'
                ],
                store: me.navStore,
                listeners: {
                    itemclick: function (view, rec) {
                        if (rec.getId() === 'logout') {
                            me.cerrarSesion();
                            return false;
                        }
                        me.irA(rec.getId());
                    }
                }
            };
        },

        /**
         * Ajusta header y menú lateral al pasar entre escritorio, tablet y móvil.
         */
        aplicarModo: function () {
            var me = this,
                modo = calcularModo(),
                movil = modo === 'movil',
                sidebar = me.down('#sidebar');

            if (modo === me.modo) {
                if (movil && me.drawer.isVisible()) {
                    me.posicionarMenu();
                }
                return;
            }

            me.modo = modo;

            Ext.suspendLayouts();
            me.down('#btnMenu').setHidden(!movil);
            me.down('#sepTitulo').setHidden(movil);
            sidebar.setHidden(movil);
            if (!movil) {
                sidebar.setWidth(modo === 'tablet' ? 200 : 240);
            }
            Ext.resumeLayouts(true);

            if (!movil) {
                me.cerrarMenu();
            }
        },

        posicionarMenu: function () {
            var top = this.down('#topbar').getHeight(),
                ancho = Math.min(260, Math.round(Ext.Element.getViewportWidth() * 0.85)),
                zIndex;

            this.drawer.setSize(ancho, Ext.Element.getViewportHeight() - top);
            this.drawer.showAt(0, top);

            zIndex = parseInt(this.drawer.el.getStyle('z-index'), 10) || 19000;
            this.drawerMask.setStyle({ top: top + 'px', zIndex: zIndex - 1 });
        },

        abrirMenu: function () {
            this.posicionarMenu();
            Ext.getBody().addCls('psico-drawer-open');
        },

        cerrarMenu: function () {
            if (this.drawer && this.drawer.isVisible()) {
                this.drawer.hide();
            }
            Ext.getBody().removeCls('psico-drawer-open');
        },

        alternarMenu: function () {
            if (this.drawer.isVisible()) {
                this.cerrarMenu();
            } else {
                this.abrirMenu();
            }
        },

        /**
         * Cambia de sección y sincroniza la URL del navegador.
         */
        irA: function (seccion, desdeHistorial) {
            if (!RUTAS[seccion]) {
                seccion = 'dashboard';
            }

            var rec = this.navStore.getById(seccion);

            this.down('#contenido').getLayout().setActiveItem(seccion);
            [this.down('#nav'), this.drawer.down('#navMovil')].forEach(function (nav) {
                nav.getSelectionModel().select(rec, false, true);
            });
            this.cerrarMenu();

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

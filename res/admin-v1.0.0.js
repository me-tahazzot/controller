/****
 * 
 * 
 * @admin_js
 * This is the main admin javaScript file
 */


/***
 * 
 * 
 * @setting
 */
let

    global = window || this;


/****
 * 
 * @main_function
 */

!(function (factory) {

    /***
     * 
     * @check
     * if the factory arguments is a function then the function will
     * be executed otherwise not...
     */
    if (typeof factory === 'function')
        factory();

}(function () {

    /*****
     * 
     * 
     * @building_function_fever
     */
    function on(event, target, func) {
        if (target.addEventListener) {
            target.addEventListener(event, func);
        }
    }

    function closest(el, selector) {
        var matchesFn;

        // find vendor prefix
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        })

        var parent;

        // traverse parents
        while (el) {
            parent = el.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }

        return null;
    }

    /***
     * 
     * @initilized
     */
    let app = function () {
        this.navOptionList();
        this.navSearch();
        this.quickPanelSettings();
        this.sidebar();
    }

    /****
     * 
     * @settings
     */
    let

        app_fn = app.prototype;



    /****
     * 
     * @navOptionList
     */
    app_fn.navOptionList = function () {
        let
            btn = document.querySelectorAll('.option-toggler'),
            tmp_list = document.querySelectorAll('.option-list a');


        for (let f = 0; f < tmp_list.length; f++) {
            const elm = tmp_list[f];
            elm.href = "javascript:void(0)";
        }

        for (let j = 0; j < btn.length; j++) {
            const elm = btn[j];

            on('click', elm, function () {
                let

                    list = elm.nextElementSibling;
                if (
                    list.className.indexOf('option-list') >= 0 &&
                    list.className.indexOf('active') >= 0
                ) {
                    list.className = list.className.replace(/ active/gi, '');
                    elm.className = elm.className.replace(/ active-style/gi, '');
                } else if (
                    list.className.indexOf('option-list') >= 0 &&
                    list.className.indexOf('active') < 0
                ) {
                    list.className += ' active';
                    elm.className += ' active-style';
                }


            });
        }

        //to set the new list item to the active one
        this.navOptionListSet();
    }

    /****
     * 
     * @navOptionListSet
     */
    app_fn.navOptionListSet = function () {
        let
            store = 'active-lang',
            items = document.querySelectorAll('.option-list a');

        for (let f = 0; f < items.length; f++) {
            const elm = items[f];

            on('click', elm, function () {
                if (closest(elm, '.option-list').previousElementSibling.className.indexOf(store) >= 0) {
                    closest(elm, '.option-list').previousElementSibling.innerHTML = '<i class="fa fa-language"></i> ' + this.textContent;

                    closest(elm, '.option-list').className = closest(elm, '.option-list').className.replace(/ active/gi, '');


                    closest(elm, '.option-list').previousElementSibling.className =
                        closest(elm, '.option-list').previousElementSibling.className.replace(/ active-style/gi, '');
                }
            });
        }
    }


    /***
     * 
     * @navSearch
     */
    app_fn.navSearch = function () {
        let
            searchBtn = document.querySelector('.nav-search-toggler'),
            searchBlock = document.querySelector('.search-bar');

        if (searchBtn === null && searchBlock === null)
            return

        on('click', searchBtn, function (e) {
            e.stopPropagation();

            if (searchBlock.className.indexOf('active') >= 0) {
                searchBlock.className = searchBlock.className.replace(/ active/gi, '');
                this.className = this.className.replace(/ active/gi, '');
            } else if (searchBlock.className.indexOf('active') < 0) {
                searchBlock.className += ' active';
                this.className += ' active';
            }
        });

        on('click', document, function () {
            if (searchBlock.className.indexOf('active') >= 0) {
                searchBlock.className = searchBlock.className.replace(/ active/gi, '');
                searchBtn.className = searchBtn.className.replace(/ active/gi, '');
            }
        });

        on('click', searchBlock, function (e) {
            e.stopPropagation();
        });
    }


    /****
     * 
     * @quick_panel_settings
     */
    app_fn.quickPanelSettings = function () {
        let

            settingsBtnOpen = document.querySelector('.toggle-quick-settings'),
            settingsBtnClose = document.querySelector('.quick-settings-close'),
            settings = document.querySelector('.quick-settings-panel');


        on('click', settingsBtnOpen, function (e) {
            e.stopPropagation();
            if (settings.className.indexOf('active') >= 0) {
                settings.className = settings.className.replace(/ active/gi, '');
            } else if (settings.className.indexOf('active') < 0) {
                settings.className += ' active';
            }
        });

        on('click', settingsBtnClose, function (e) {
            e.stopPropagation();
            settings.className = settings.className.replace(/ active/gi, '');
        });

        on('click', document, function () {
            if (settings.className.indexOf('active') >= 0) {
                settings.className = settings.className.replace(/ active/gi, '');
            }
        });

        on('click', settings, function (e) {
            e.stopPropagation();
        });
    }



    /****
     * 
     * @sidebar
     * Here I will define all the property for sidebar
     */
    app_fn.sidebar = function () {
        this.sidebar = document.getElementById('sidebar');
        this.navbar = document.getElementById('navbar');
        this.navbarChild = document.getElementById('navbar-child');
        this.content = document.getElementById('content-wrapper');
        this.btn = document.getElementById('apply-sidebar-setting');
        this.sidebarBack = document.querySelector('.sidebar-backface');
        this.sidebarToggler = document.querySelector('.sidebar-toggler');
        this.config = {
            data: null
        };


        //check the sidebar exist or not...
        if (this.sidebar === null || this.navbar === null || navbar.navbarChild === null || this.content === null || this.btn === null)
            return

        this.restoreSidebar();
        this.getClass();
        this.sidebarToggle();
    }

    app_fn.restoreSidebar = function () {
        if (localStorage.getItem('settings')) {
            this.config = JSON.parse(localStorage.getItem('settings'));
            this.sidebarProcess(this.config.data);
        }

        on('resize', document, function () {
            this.sidebarProcess(this.config);
        });
    }

    app_fn.getClass = function () {
        let
            that = this;

        on('click', this.btn, function () {
            document.querySelectorAll('input[name = "sidebar-style"]').forEach(elm => {
                return elm.checked ? (that.sidebarProcess(elm.getAttribute('data-class')), that.setConfig(elm.getAttribute('data-class'))) : false;
            });
        });
    }

    app_fn.setConfig = function (string) {
        this.config.data = string;
        localStorage.setItem('settings', JSON.stringify(this.config));
    }

    app_fn.sidebarProcess = function (string) {
        let

            sidebarH = string.split(' ')[0],
            sidebarW = string.split(' ')[1];

        /***
         * 
         * sidebar-face-default sidebar-default
         */

        if (sidebarH === 'sidebar-face-default' && sidebarW === 'sidebar-default') {
            this.navbar.style.left =
                this.navbarChild.style.left = '0';

            this.content.style.marginLeft = '250px';
            this.sidebar.className = string;
            this.sidebarBack.className = 'sidebar-backface'
        }

        /***
         * 
         * sidebar-face-full sidebar-expand
         */
        if (sidebarH === 'sidebar-face-full' && sidebarW === 'sidebar-expand') {
            this.navbar.style.left =
                this.navbarChild.style.left = '250px';

            this.content.style.marginLeft = '250px'

            this.sidebar.className = string;
            this.sidebarBack.className = 'sidebar-backface'
        }

        /****
         * 
         * sidebar-face-full sidebar-wrapped
         */
        if (sidebarH === 'sidebar-face-full' && sidebarW === 'sidebar-wrapped') {
            this.navbar.style.left =
                this.navbarChild.style.left = '100px';

            this.content.style.marginLeft = '100px';
            this.sidebar.className = string;
            this.sidebarBack.className = 'sidebar-backface sidebar-wrapped'
        }

        /***
         * 
         * sidebar-face-default sidebar-wrapped
         */
        if (sidebarH === 'sidebar-face-default' && sidebarW === 'sidebar-wrapped') {
            this.navbar.style.left =
                this.navbarChild.style.left = '0';

            this.content.style.marginLeft = '100px';
            this.sidebar.className = string;
            this.sidebarBack.className = 'sidebar-backface sidebar-wrapped'
        }
    }


    app_fn.sidebarToggle = function () {
        let
            that = this;

        on('click', that.sidebarToggler, function (e) {
            e.stopPropagation();

            if (that.sidebar.className.indexOf('active') <= 0) {
                that.sidebar.className += ' active';
                that.sidebarBack.className += ' active';
            } else if (that.sidebar.className.indexOf('active') >= 0) {
                that.sidebar.className = that.sidebar.className.replace(/ active/gi, '');
                that.sidebarBack.className = that.sidebarBack.className.replace(/ active/gi, '');
            }
        });

        on('click', this.sidebar, function (e) {
            e.stopPropagation();
        });

        on('click', document, function () {
            if (that.sidebar.className.indexOf('active') >= 0)
                that.sidebar.className = that.sidebar.className.replace(/ active/gi, '');
            that.sidebarBack.className = that.sidebarBack.className.replace(/ active/gi, '');
        });
    }


    new app();
}));
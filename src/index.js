import './script/app-bar.js';
import './script/footer.js';
import './css/style.css';
import logo from './img/logo_remove.png';
const linkIcon = document.querySelector("link[rel='icon']");
linkIcon.href = logo;


import local from './script/local-storage.js';

import main from './script/api-get.js';

import api from './script/api-note.js';
api();
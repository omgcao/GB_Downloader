// ==UserScript==
// @name         gb688下载
// @namespace    https://github.com/lzghzr/TampermonkeyJS
// @version      1.0.7
// @author       lzghzr, chorar
// @description  下载gb688.cn上的国标文件
// @supportURL  https://github.com/lzghzr/TampermonkeyJS/issues
// @match        *://*.gb688.cn/bzgk/gb/showGb*
// @match        *://*.samr.gov.cn/bzgk/gb/showGb*
// @connect     c.gb688.cn
// @license     MIT
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    const online = document.getElementById("toolbarViewerRight");
    if (online === null) {
        throw '获取页面元素失败！';
    }
    const download = document.querySelector('button.toolbarButton.download');
    if (download !== null) {
        download.remove();
    }
    const GBdownload = document.createElement('button');
    GBdownload.title = '下载';
    GBdownload.className = 'toolbarButton download';
    GBdownload.innerHTML = '<span>下载</span>';
    online.insertAdjacentElement('afterbegin', GBdownload);
    GBdownload.onclick = async () => {
        PDFViewerApplication.pdfDocument.saveDocument(PDFViewerApplication.pdfDocument.annotationStorage).then(res =>{
            const blob = new Blob([res], { type: "application/pdf" });
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.target = "_parent";
            a.download = document.title.substr(document.title.indexOf('|')+1).replace("/", '_')+".pdf";
            (document.body || document.documentElement).appendChild(a);
            a.click();
        }).catch(err =>{
            console.log(err)
        });
    };
})();

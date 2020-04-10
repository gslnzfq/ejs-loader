var _ = require("lodash");
var loaderUtils = require('loader-utils');
var htmlmin = require('html-minifier');

module.exports = function (source) {
    this.cacheable && this.cacheable();
    var options = loaderUtils.getOptions(this);
    var tmplOpts = {};
    ['escape', 'interpolate', 'evaluate'].forEach(function (templateSetting) {
        var setting = tmplOpts[templateSetting];
        if (_.isString(setting)) {
            tmplOpts[templateSetting] = new RegExp(setting, 'g');
        }
    });

    if (options.htmlmin) {
        source = htmlmin.minify(source, options['htmlminOptions'] || {});
    }

    var template = _.template(source, _.extend({}, tmplOpts));
    return 'module.exports = ' + template;
};

const {src, dest, series, watch} = require('gulp');
const sync = require('browser-sync').create();
const concat = require('gulp-concat');
const del = require('del');

function html() {
    return src('src/**.html')
    .pipe(dest('dist'))
};

function css() {
    return src('src/css/**.css')
    .pipe(concat('index.css'))
    .pipe(dest('dist/css'))
};

function scripts() {
    return src('src/**.js')
    .pipe(dest('dist/js'))
}

function images() {
    return src('src/img/**')
    .pipe(dest('dist/img'))
};

function fonts() {
    return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
};

function clear() {
    return del('dist');
}

function serve() {
    sync.init({
        server: { baseDir: './dist'},
    })
    watch('src/**.html', series(html)).on('change', sync.reload);
    watch('src/css/**.css', series(css)).on('change', sync.reload);
    watch('src/**.js', series(scripts)).on('change', sync.reload);
}

exports.clear = clear;

exports.build = series(clear, html, images, fonts, css, scripts);
exports.serve = series(clear, html, images, fonts, css, scripts, serve);


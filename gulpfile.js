const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");

//copyindex
gulp.task("html", done => {
    gulp.src("*.html")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload())
    done();
})
//复制html,img,js文件
gulp.task("copyhtml", done => {
    gulp.src("./html/*")
        .pipe(gulp.dest("dist/html"))
        .pipe(connect.reload())
    done();
})
gulp.task("copyimg", done => {
    gulp.src("./img/*")
        .pipe(gulp.dest("dist/img"))
        .pipe(connect.reload())
    done();
})
gulp.task("copyjs", done => {
    gulp.src("./js/*")
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload())
    done();
})

//把.scss文件转为.css
gulp.task("sass", done => {
    gulp.src("sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
    done();
})
//创建服务器
gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: "true",
    })
    done();
})

gulp.task("build", gulp.series("html", "copyhtml", "copyimg", "copyjs", "sass"));
//监听 挨个监听
gulp.task("watch", done => {
    gulp.watch("*.html", gulp.series("html"));
    gulp.watch("./html/*", gulp.series("copyhtml"));
    gulp.watch("./img/*", gulp.series("copyimg"));
    gulp.watch("./js/*", gulp.series("copyjs"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    done();
})
//默认行为
gulp.task("default", gulp.series("build", "server", "watch"))

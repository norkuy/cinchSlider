var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass'),
watch = require('gulp-watch'),
server = require('browser-sync');
 
gulp.task('server', function() {
    server.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('reload', function() {
  server.reload()
});

gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css/'))
});
 
gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', ['sass', 'reload']);
});

gulp.task('autoprefixer', function () {
	return gulp.src('src/.css')
		.pipe(autoprefixer({
       browsers: [
        '> 1%',
        'last 2 versions',
        'firefox >= 4',
        'safari 7',
        'safari 8',
        'IE 6',
        'IE 7',
        'IE 8',
        'IE 9',
        'IE 10',
        'IE 11'
        ],
			cascade: true
		}))
});

gulp.task('default', ['server', 'watch']);

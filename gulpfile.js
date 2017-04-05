var gulp = require('gulp');
var rename = require('gulp-rename');
var imageResize = require('gulp-image-resize');


var config = {
	originalName : 'original',
	sizes: [
		{width: 900, quality: 0.8 },
		{width: 768, quality: 0.8 },
		{width: 640, quality: 0.8 }
	],
	defaultQuality: 0.6
};

var resizeImages =  function(size, quality){
	gulp.src('_src/**/*.*')
	.pipe(rename(function(path){
		console.log('Old path name: ' + path.dirname);
		path.dirname = path.dirname.replace(config.originalName, size.toString());
		console.log('New path name: ' + path.dirname);
		path.basename = path.basename.replace(config.originalName, size.toString());
	}))
	.pipe(imageResize({
		width: size,
		crop: false,
		imageMagick: true,
		quality: quality

	}))
	.pipe(gulp.dest("_dest"));
};

gulp.task('default', function(){
	for (i in config.sizes){
		var imageQuality = config.sizes[i].quality || config.defaultQuality;
		resizeImages(config.sizes[i].width, imageQuality);
	}
});
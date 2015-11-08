module.exports = function (grunt) {
	
grunt.initConfig({  
 
	csso: {
	  compress: {
		options: {
		  report: 'gzip'
		},
		files: {
		  'prod/css/style.min.css': ['dev/css/style.css', 'dev/css/jquery.fancybox.css', 'dev/css/jquery.bxslider.css', 'dev/libs/font-awesome/css/font-awesome.css']
		}
	  }
	},

    concat: {
		options: {
			stripBanners: {
                block : false,
                line : true
            },
			sourceMap: true,
			sourceMapName: 'best',
			separator: '\n\r',
            banner: '/*\nConcatinated JS file \n' +
                    'Author: Mahesh \n' +
                    'Created Date: <%= grunt.template.today("yyyy-mm-dd") %>' +
                    '\n */ \n'
        },
		dist: {
		  src: ['dev/js/*.js'],
		  dest: 'dev/css/js.js',
		},
	  },

	autoprefixer: {
		single_file: {
			src: 'dev/css/style.css',
			dest: 'dev/css/style.css'
		}  
	},

	

	uglify: {
	  my_target: {
		files: {
			'prod/js/scripts.min.js': ['dev/libs/jquery/dist/jquery.min.js', 'dev/js/jquery.bxslider.min.js', 'dev/libs/bootstrap-sass/assets/javascripts/bootstrap.js', 'dev/js/jquery.fancybox.js', 'dev/js/helpers/jquery.fancybox-thumbs.js', 'dev/js/jquery.mousewheel-3.0.6.pack.js', 'dev/js/jquery.maskedinput.min.js', 'dev/js/jquery.carouFredSel-6.1.0-packed.js', 'dev/js/common.js']
		}
	  }
	},

	
	copy: {
		main: {files: [{expand: true, cwd: 'dev/', src: ['**/*.php', '!config.php', 'libs/font-awesome/fonts','.htaccess'], dest: 'prod/'},
				{expand: true, cwd: 'dev/libs/font-awesome/fonts', src: ['**'], dest: 'prod/fonts'}]
		}
	},

	htmlmin: {
	  dist: {
		options: {
			removeComments: true,
			collapseWhitespace: true
		  },
		files: [{                                   
			expand: true,
			cwd: 'prod/',
			src: ['**/*.php', '*.php', '!config.php', '!**/var.php', '!var.php'],
			dest: 'prod/'     
		}]
	  }
	},

	watch: {
		html: {
			files: ['*.html','*/*.html', '!dist/*.html', '!release/*.html'],
			tasks: ['includereplace', 'processhtml']
		},
		css: {
			files: ['css/*.css'],
			tasks: ['cssmin']
		}
	}

	
	
	

});

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');    
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-uncss');
	
    grunt.registerTask('default', ['autoprefixer']);  
	  
};
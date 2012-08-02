var Isoplay = (function(){

	var Isoplay = function(options){

		this.options = $.extend({
				x 				: 4
			, y 				: 4
			, y_reverse : true
			, x_unit    : 60
      , y_unit    : 30
		}, options)


		this.canvas 	= document.getElementById(this.options.canvas)
		this.element 	= $("#" + this.options.canvas)
		this.ctx 			= this.canvas.getContext("2d")
		this.canvas_w = this.canvas.width
		this.canvas_h = this.canvas.height
	}

	Isoplay.prototype.init = function(x, y){

		this.options.x = x || this.options.x
		this.options.y = y || this.options.y
		this.grid = {}

		for(var y=0; y<this.options.y; y++){
			for(var x=0; x<this.options.x; x++){
				
				this.drawBloc({ x: x+y, y: y, w: 1, h: 1 })

				// this.grid['' + x + '.' + y + ''] = {
				// 		free : true
				// 	, element : null
				// }
			}
		}

	}

	Isoplay.prototype.drawBloc = function(bloc){

		var o 			= this.options,
				ctx 		= this.ctx

		calc_x 	= function(x){ return o.x_unit * x }
		calc_y 	= function(y){ return o.y_unit * y }

    ctx.beginPath()

    x = calc_x(bloc.x)
    y = o.y_reverse ? this.canvas_h - calc_y(bloc.y) : calc_y(bloc.y)
    ctx.moveTo(x, y)

    x = x + calc_x(bloc.w)
    y = y
    ctx.lineTo(x, y)

    x = x + (calc_x(bloc.w))
    y = o.y_reverse ? y - calc_y(bloc.h) : (y + calc_y(bloc.h))
    ctx.lineTo(x, y)

    x = x - calc_x(bloc.w)
    y = y
    ctx.lineTo(x, y)

    ctx.closePath()
    ctx.fillStyle = "#ddd";
    ctx.fill()
    ctx.strokeStyle = "#999";
    ctx.stroke()

  }

	return Isoplay

}())

class KeyboardMode{
  constructor( options ){
    this.options = Object.assign({
      classElement: document.documentElement,
      className: 'keyboard',
      moveThreshold: 10
    }, options );

    this.activated = false;

    document.body.addEventListener( 'keydown', this );
    document.body.addEventListener( 'click', this, true );

    if( this.options.moveThreshold !== false ){
      document.body.addEventListener( 'mousemove', this, true );
    }
  }

  activate( event ){
    if( this.activated || event.keyCode !== 9 ){
      return;
    }

    const apply = this.options.rules ? this.options.rules( event ) : true;

    if( !apply ){
      return;
    }

    this.options.classElement.classList.add( this.options.className );
    this.activated = true;
  }

  cancel(){
    this.options.classElement.classList.remove( this.options.className );
    this.activated = false;
  }

  handleEvent( event ){
    switch( event.type ){
      case 'click':
        if( event.detail === 1 && this.activated ){
          this.cancel( event );
        }
        break;
      case 'mousemove':
        if( this.activated ){
          this.watchThreshold( event );
        }
        break;
      default:
        this.activate( event );
    }
  }

  watchThreshold( event ){
    const startX = this.options.mouseX || event.clientX;
    const startY = this.options.mouseY || event.clientY;

    if( !this.options.mouseX ){
      this.options.mouseX = startX;
    }

    if( !this.options.mouseY ){
      this.options.mouseY = startY;
    }

    if(( Math.abs( this.options.mouseX - event.clientX ) >= this.options.moveThreshold ) || ( Math.abs( this.options.mouseY - event.clientY ) >= this.options.moveThreshold )){
      delete this.options.mouseX;
      delete this.options.mouseY;

      this.cancel();
    }
  }


}

export default KeyboardMode;

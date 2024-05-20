import { Animaciones } from "./../public/scripts/animaciones.js";

export default class menu_personajes extends Phaser.Scene {
  constructor() {
    super("main2");

    this.opciones = 1;
    this.Arriba = false;
    this.abajo = false;
    this.izquierda = false;
    this.derecha = false;

    this.personaje = "gato1"
  }

  init() {
  }

  preload() {
    //background//
    this.load.image ("fondo2", "./public/background/fondo2.jpg");
    //background//

    //gatos//
    this.load.spritesheet("gato1", "./public/sprites/gato_spritesheet.png", { frameWidth: 32, frameHeight: 32, key: 'black'});
    this.load.spritesheet("gato2", "./public/sprites/gato_spritesheet_2.png", { frameWidth: 32, frameHeight: 32, key: 'black'});
    this.load.spritesheet("gato3", "./public/sprites/gato_spritesheet_3.png", { frameWidth: 32, frameHeight: 32, key: 'black'});
    this.load.spritesheet("gato4", "./public/sprites/gato_spritesheet_4.png", { frameWidth: 32, frameHeight: 32, key: 'black'});
    //gatos//
  }

  create() {
    //caja de fondo//
    this.fondo = this.add.image(108, 108, "fondo2")

    //teclado
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.cursors = this.input.keyboard.createCursorKeys();

    //texto//
    this.titulo = this.add.text(24, 216 / 4 + 32, "retro", { fontFamily: 'GameBoy', fontSize: 8, color: '#ff00ff'});
    this.descripcion = this.add.text(216 / 4 + 32, 216 / 8, "Me copie el\ncolor de\nPac-man, igual\nque el fondo.", { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff'});

    this.list_1 = this.add.text(20, 126, "# 001", {fontFamily: "GameBoy", fontSize: 8, color: "#ff0000"})
    this.list_2 = this.add.text(116, 126, "# 002", {fontFamily: "GameBoy", fontSize: 8, color: "#ffffff"})
    this.list_3 = this.add.text(20, 126 + 8, "# 003", {fontFamily: "GameBoy", fontSize: 8, color: "#ffffff"})
    this.list_4 = this.add.text(116, 126 + 8, "# 004", {fontFamily: "GameBoy", fontSize: 8, color: "#ffffff"})
    this.list_5 = this.add.text(20, 126 + 16, "# 005: ???", {fontFamily: "GameBoy", fontSize: 8, color: "#ffffff"})
    this.list_6 = this.add.text(116, 126 + 16, "# 006: ???", {fontFamily: "GameBoy", fontSize: 8, color: "#ffffff"})

    //jugador//
    this.gato = this.add.sprite(216 / 4, 216 / 4, this.personaje)
    this.gato.setScale(2)
  }

  update() {
    if (this.cursors.down.isDown) { //si precionan el boton de abajo
      if (this.abajo == false) {
        this.abajo = true;
        if (this.opciones == 5) { //si esta en la ultima opcion pasa a la primera
          this.opciones = 1;
        }
        else if (this.opciones == 6) {
          this.opciones = 2
        }
  
        else{
          this.opciones += 2;
        }
      }
    }
    else {
      this.abajo = false;
    }

    if (this.cursors.up.isDown) { //si preciona el boton de arriba
      if (this.arriba == false){
        this.arriba = true;
        if (this.opciones == 1) { //si esta en la primera opcion pasa a la ultima
          this.opciones = 5;
        }
        else if (this.opciones == 2) {
          this.opciones = 6;
        }
  
        else{
          this.opciones -= 2;
        }
      }
    }

    else {
      this.arriba = false;
    }

    if (this.cursors.left.isDown) { //si precionan el boton de izquierda
      if (this.izquierda == false) {
        this.izquierda = true;
        if (this.opciones == 1) { //si esta en la ultima opcion pasa a la primera
          this.opciones = 6;
        }
  
        else{
          this.opciones --;
        }
      }
    }
    else {
      this.izquierda = false;
    }

    if (this.cursors.right.isDown) { //si preciona el boton de arriba
      if (this.derecha == false){
        this.derecha = true;
        if (this.opciones == 6) { //si esta en la primera opcion pasa a la ultima
          this.opciones = 1;
        }
  
        else{
          this.opciones ++;
        }
      }
    }

    else {
      this.derecha = false;
    }

    
    //en que opcion esta?
    if (this.opciones == 1) {
      this.personaje = "gato1"
      this.gato.setTexture(this.personaje);

      this.titulo.setText("retro")
      this.descripcion.setText("Me copie el\ncolor de\nPac-man, igual\nque el fondo.")
      this.list_1.setColor('#ff0000')
      this.list_2.setColor('#ffffff')
      this.list_3.setColor('#ffffff')
      this.list_4.setColor('#ffffff')
      this.list_5.setColor('#ffffff')
      this.list_6.setColor('#ffffff')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('main2');
      }
    }

    if (this.opciones == 2) {
      this.personaje = "gato2"
      this.gato.setTexture(this.personaje);

      this.titulo.setText("bicolor")
      this.descripcion.setText("es el que\norganiza las\npeleas en el\ntecho.")
      this.list_1.setColor('#ffffff')
      this.list_2.setColor('#ff0000')
      this.list_3.setColor('#ffffff')
      this.list_4.setColor('#ffffff')
      this.list_5.setColor('#ffffff')
      this.list_6.setColor('#ffffff')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('main2');
      }
    }
    
    if (this.opciones == 3) {
      this.personaje = "gato3";
      this.gato.setTexture(this.personaje);

      this.titulo.setText("*este comentario a sido\neliminado*")
      this.descripcion.setText("Los naranjas\nlos culparon de\ndar mala suerte.")
      this.list_1.setColor('#ffffff')
      this.list_2.setColor('#ffffff')
      this.list_3.setColor('#ff0000')
      this.list_4.setColor('#ffffff')
      this.list_5.setColor('#ffffff')
      this.list_6.setColor('#ffffff')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('main2');
      }
    }
    
    if (this.opciones == 4) {
      this.personaje = "gato4"
      this.gato.setTexture(this.personaje);

      this.titulo.setText("ragdoll")
      this.descripcion.setText("tiene cara de\ntomar mucho\nchocomilk.")
      this.list_1.setColor('#ffffff')
      this.list_2.setColor('#ffffff')
      this.list_3.setColor('#ffffff')
      this.list_4.setColor('#ff0000')
      this.list_5.setColor('#ffffff')
      this.list_6.setColor('#ffffff')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('main2');
      }
    }
    
    if (this.opciones == 5) {
      this.personaje = "gato5"
      this.gato.setTexture(this.personaje);

      this.titulo.setText("este comentario a sido eliminado")
      this.descripcion.setText("Me copie el\ncolor de\nPac-man, igual\nque el fondo.")
      this.list_1.setColor('#ffffff')
      this.list_2.setColor('#ffffff')
      this.list_3.setColor('#ffffff')
      this.list_4.setColor('#ffffff')
      this.list_5.setColor('#ff0000')
      this.list_6.setColor('#ffffff')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('main2');
      }
    }
    
    if (this.opciones == 6) {
      this.personaje = "gato6"
      this.gato.setTexture(this.personaje);

      this.titulo.setText("este comentario a sido eliminado")
      this.descripcion.setText("Me copie el\ncolor de\nPac-man, igual\nque el fondo.")
      this.list_1.setColor('#ffffff')
      this.list_2.setColor('#ffffff')
      this.list_3.setColor('#ffffff')
      this.list_4.setColor('#ffffff')
      this.list_5.setColor('#ffffff')
      this.list_6.setColor('#ff0000')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('main2');
      }
    }
  }
}
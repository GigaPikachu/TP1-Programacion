import { handleMovement } from "./../public/scripts/movimientos.js";
import { Animaciones } from "./../public/scripts/animaciones.js";

export default class Game extends Phaser.Scene {
    constructor() {
      super("main3");
    }

    init() {
        //vidas
        this.vidas = 3;

        //animaciones
        this.anim_sosteniendose = false;
    }

    preload() {
        //background//
        this.load.image ("fondo", "./public/background/fondo.jpg")
        this.load.image ("pared", "./public/background/pared.png")
        this.load.image ("piso", "./public/background/piso.png")
        //background//

        //animaciones//
        this.load.spritesheet("gato", "./public/sprites/gato_spritesheet.png", { frameWidth: 32, frameHeight: 32, key: 'black'});
        //animaciones//

        //sprites//
        this.load.image ("pez", "./public/sprites/pez.png")
        this.load.image ("manzana", "./public/sprites/manzana.png")
        //sprites//
    }

    create() {
        //caja de fondo//
        this.fondo = this.add.image(108, 108, "fondo")

        this.paredes = this.physics.add.staticGroup();
        this.paredes.create(8, 108, "pared");
        this.paredes.create(208, 108, "pared");
        this.paredes.create(108, 208, "piso");
        
        this.paredes.create(108, 8, "piso");
        //------------------------------------------------------

        //objetos//
        this.pez = this.physics.add.image ( Phaser.Math.Between(24, 192), Phaser.Math.Between(100, 192), "pez");
        this.pez.body.setSize(13, 10);
        this.pez.body.setAllowGravity(false);

        this.manzanas = this.physics.add.group();

        //evento cada 1 segundo
        this.time.addEvent({
            delay: 500,
            callback: this.onSecond,
            callbackScope: this,
            loop: true,
        })
        //------------------------------------------------------

        //jugador//
        this.gato = this.physics.add.sprite(108, 108, "gato");
        this.gato.body.setSize(20, 20);
        this.gato.setCollideWorldBounds(true);

        Animaciones(this);

        this.gato.anims.play("sentado");
        //------------------------------------------------------

        //vidas//
        this.num_vidas = this.add.text(18, 18, this.vidas, { fontFamily: 'GameBoy', fontSize: 8, color: '#FF0000' });
        //------------------------------------------------------

        //puntaje//
        this.score = 0;
        this.puntaje = this.add.text(128, 18, "score:"+this.score, { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff' });
        //------------------------------------------------------

        // coliciones con el personaje //
        this.physics.add.collider(this.gato, this.paredes);

        this.physics.add.collider(this.gato, this.piso);

        this.physics.add.overlap(this.gato, this.pez, this.collisionHandler, null, this);

        this.physics.add.overlap(this.gato, this.manzanas, this.menos1vida, null, this);

        // control //
        this.cursors = this.input.keyboard.createCursorKeys();

        //gameover//
        this.gameover = this.add.text(44, 100, "", { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff' })
        this.reintentar = this.add.text(44, 132, "", { fontFamily: 'GameBoy', fontSize: 6, color: '#ffffff' })
    }

    update() {
        //movimientos//
        const { velocityX, velocityY, aceleracion } = handleMovement(this.gato, this.cursors);
        this.gato.setVelocityX(velocityX);
        if (velocityY < 0) {
            this.gato.setVelocityY(velocityY);
        }
        this.gato.setAccelerationX(aceleracion)

        if (this.gato.body.velocity.x > 0) {
            this.gato.body.setOffset(6, 6);
            this.gato.setScale(1, 1); // pocicion normal
        }

        else if  (this.gato.body.velocity.x < 0) {
            this.gato.body.setOffset(26, 6);
            this.gato.setScale(-1, 1); // Voltea horizontalmente
        }

        //puntaje//
        this.puntaje.setText( "score:"+this.score );
        this.num_vidas.setText( this.vidas );

        //Game Over//
        if (this.vidas == 0 || this.score == 999){
            this.gameover.setText("     ¿ vas a dejar\nal pobre gato asì ?")
            this.reintentar.setText("Press F5 to retry")
            this.scene.stop("main3");
            this.scene.start("main");
        }
    }
    
    collisionHandler() {
        this.pez.x = Phaser.Math.Between(24, 192);
        this.pez.y = Phaser.Math.Between(100, 192);
        this.pez.setVelocity(0, 0);
        this.score ++;
    }

    onSecond() { //cada un segundo//
        const tipos = ["triangulo", "cuadrado", "rombo"];
        const tipo = Phaser.Math.RND.pick(tipos)
        let manzanas = this.manzanas.create(Phaser.Math.Between(24,192), 24, "manzana");
    }

    menos1vida(gato, manzanas,) {
        if (this.vidas > 0){
            manzanas.destroy();
            this.vidas --;
        }
        else {
            this.gameover.setText("¿vas a dejar al pobre gato asi?")
        }
    }
}
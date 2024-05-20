let velocityX = 0;
let Vel_salto = -300;
let aceleracion = 0;
let velocity = 150;
let direccion = true;
let anim_sentado = false;
let anim_caminando = false;
let anim_sosteniendose = false

function handleMovement(gato, cursors) {
    let velocityY = 0;

    //movimiento lateral//
    if (cursors.left.isDown){
        if (gato.body.touching.down) {
            aceleracion = 0;
            velocityX = -velocity;
            direccion = false;
            if (anim_caminando == false) {
                gato.anims.play("caminando");
                anim_caminando = true;
            }
            anim_sentado = false;
            anim_sosteniendose = false;
        }

        else {
            aceleracion = -2000;
        }

    }
    else if (cursors.right.isDown){
        if (gato.body.touching.down) {
            aceleracion = 0;
            velocityX = velocity;
            direccion = true;
            if (anim_caminando == false) {
                gato.anims.play("caminando");
                anim_caminando = true;
            }
            anim_sentado = false;
            anim_sosteniendose = false;
        }

        else {
            aceleracion = 2000;
        }
    }

    else if (gato.body.touching.down) {
        velocityX = 0;
        aceleracion = 0;
        if (anim_sentado == false) {
            gato.anims.play("sentado");
            anim_sentado = true;
        }
        anim_caminando = false;
        anim_sosteniendose = false;
    }

    //gato sosteniendose
    if (gato.body.touching.left && cursors.left.isDown && gato.body.touching.down == false && cursors.up.isDown == false) {
        gato.setVelocityY(25);
        if (anim_sosteniendose == false) {
            gato.anims.play("sosteniendose")
            anim_sosteniendose = true;
            console.log("se esta ejecutando la animacion")
        }
        anim_sentado = false;
        anim_caminando = false;
    }
    else if (gato.body.touching.right && cursors.right.isDown && gato.body.touching.down == false && cursors.up.isDown == false) {
        gato.setVelocityY(25);
        if (anim_sosteniendose == false) {
            gato.anims.play("sosteniendose")
            anim_sosteniendose = true;
        }
        anim_sentado = false;
        anim_caminando = false;
    }

    else {
        if (gato.body.velocity.y < -30) {
            gato.setFrame (8);
        }
        else if (gato.body.velocity.y <= 30 && gato.body.velocity.y >= -30 && gato.body.touching.down == false){
            gato.setFrame (9);
        }
        else if (gato.body.velocity.y > 30){
            gato.setFrame (10);
        }
    }

    //saltos//
    if (cursors.up.isDown && gato.body.touching.down) { //saltar sin moverse//
        velocityY = Vel_salto;
    }
    else if (cursors.up.isDown && cursors.right.isDown && gato.body.touching.right) { //saltar en la pared de la derecha
        velocityY = -200;
        velocityX = -150;
    }
    else if (cursors.up.isDown && cursors.left.isDown && gato.body.touching.left) { //saltar en la paded de la izquierda
        velocityY = -200;
        velocityX = 150;
    }

    return {velocityX, velocityY, aceleracion};
}

export { handleMovement };
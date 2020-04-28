public void update(Game game){
    currentState.update(game,this);
    animations.update(game);
    final GameWorld world = game.world();
    float friction = 0;
    float gravity = 0;
    if( world.isOnGround( asRect() )){
        friction = game.config().friction();
    }else{
        friction = game.config().airfriction();
        gravity = game.config().gravity();
    }
    
    if(velocity.x != 0){
        if(velocity.x > 0){
            friction =-friction;
        }
        
        if(abs(velocity.x) - abs(friction) < 0){
            velocity.x = 0;
        }else{
            velocity.x = velocity.x + friction;
        }
        
    }
    applyForce(0, gravity );
    
    velocity.x = equalize(velocity.x, game.config().playerMaxVelocityX(), -game.config().playerMaxVelocityX());
    velocity.y = equalize(velocity.y, game.config().playerMaxVelocityY(), -game.config().playerMaxVelocityY());

    
    
    final PVector newPos = worldPosition.copy();
    //TODO: border check.
    newPos.x += velocity.x;
    newPos.y -= velocity.y;
    
    final int rightCollision = world.getCollisionRight(this.asRect(), floor(spriteHeight() ));
    final int leftCollison = world.getCollisionLeft( this.asRect(), floor(spriteWidth()) ) ;
    newPos.x = equalize(
        newPos.x,
        rightCollision,
        leftCollison
    );
    if(newPos.x == leftCollison || newPos.x == rightCollision){
        velocity.x = 0;
    }
    //final int groundLevel = game.world().absolutePositionOfGround(zeroBasedX(newPos.x), floor( spriteWidth() ));
    //int groundLevel = game.world().absolutePositionOfGround( new CollisionBox(zeroBasedX(newPos.x), zeroBasedY(newPos.y), spriteWidth(), spriteHeight() )); //TODO: don't create a new object each time
    final int groundLevel = world.groundLevelInPx( asRect());
    final int ceiling = world.getCollisionCeiling( this.asRect(), floor(spriteHeight()) );
    newPos.y = equalize(
        newPos.y,
        ceiling,
        groundLevel
    );
    if(newPos.y == ceiling){
        velocity.y = 0;
    }
    
    if(velocity.x < 0){
        direction = 0;
    }
    if(velocity.x > 0){
        direction = 1;
    }
    worldPosition = newPos;
    
    game.camera.centerOn(
        position().x + (spriteWidth() / 2) ,
        position().y + (spriteHeight() / 2)
    );
    
    render(
        game.camera.getWidth() / 2 + game.camera.absoluteX(),
        game.camera.getHeight() / 2 + game.camera.absoluteY()
    );
    
    int[] events = world.getEvents( this.asRect() ); 
    for(int i = 0; i < events.length; ++i){
        switch(events[i]){
            case 1: game.setGameState(true); break;
            case 2: game.setGameState(false);  break;
            default: {
                if(isTutorialEvent(events[i])){
                    handleTutorialEvent(game, this, events[i]);
                }
            }
        }
    }
    
    if(game.config().debugInformations()){
        int textY = 10;
        int textStep = 15;
        fill(175,175,175);
        boolean onGround = groundLevel == position().y;
        text("dir:="      + (direction == 0 ? "Left" : "Right"), 0, textY); textY += textStep;
        text("x:="        + position().x + " y:=" + position().y, 0, textY); textY += textStep;
        text("width:="    + spriteWidth() + " height:=" +spriteHeight(), 0, textY); textY += textStep;
        text("v(x):="     + velocity.x, 0, textY); textY += textStep;
        text("v(y):="     + velocity.y, 0, textY); textY += textStep;
        text("jmp:="      + (velocity.y < 0), 0, textY); textY += textStep;
        text("fllng:="    + (velocity.y > 0 && !onGround), 0, textY); textY += textStep;
        text("ground:="   + groundLevel, 0, textY); textY += textStep;
        text("in air:="    + !world.isOnGround(asRect()),0, textY); textY += textStep;
        text("friction:=" + friction, 0, textY); textY += textStep;
        pushMatrix();
        fill(255,0,0,70);
        rectMode(CENTER);
        float w = spriteWidth();
        float h = spriteHeight();
        float x = game.camera.getWidth() / 2 + game.camera.absoluteX();
        float y = game.camera.getHeight() / 2 + game.camera.absoluteY();
        rect(x,y,w,h);
        popMatrix();
        fill(0,255,0,70);
        //ellipse(game.camera.getWidth() / 2 + game.camera.absoluteX(),game.camera.getHeight() / 2 + game.camera.absoluteY(),10,10);
        ellipse(game.camera.getWidth() / 2 + game.camera.absoluteX() - spriteWidth() / 2,game.camera.getHeight() / 2 + game.camera.absoluteY() + spriteHeight()/ 2,10,10);
        
    }
}
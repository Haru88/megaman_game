public int groundLevelInPx(SpriteRect rect){
    accessCheck(rect);
    //println(String.format("x:=%s y:=%s w:=%s h=%s", rect.getXPx(), rect.getYPx(), rect.getWidthPx(), rect.getHeightPx() ));
    for (int yPx = rect.getYPx()/* + rect.getHeightPx()*/; yPx > 0; yPx -= blockSize() ) {
        for (int xPx = rect.getXPx(); xPx < rect.getWidthPx() + rect.getXPx(); xPx += blockSize() ) {
            final int xBlock = toBlock(xPx);
            final int yBlock = toBlock(yPx);
            if (isSolid(xBlock, yBlock)) {
                return yBlock * blockSize() + blockSize();
            }
        }

    }
    return 0;
}

public int getCollisionRight(SpriteRect rect, int lookAheadLimit){
    accessCheck(rect);
    int forwardProjection = rect.getXPx() + rect.getWidthPx() + lookAheadLimit;
    for (int xPx = rect.getXPx() + rect.getWidthPx(); xPx < forwardProjection && xPx < widthInPx(); xPx += blockSize() ) {
        for (int yPx = rect.getYPx(); yPx < rect.getYPx() + rect.getHeightPx(); yPx += blockSize() ) {
            int xBlock = toBlock(xPx);
            int yBlock = toBlock(yPx);
            if (isSolid(xBlock, yBlock)) {
                return xBlock * blockSize() - rect.getWidthPx();
            }
        }
    }
    return widthInPx() - 1 - rect.getWidthPx();
}

public int getCollisionLeft(SpriteRect rect, int lookAheadLimit){
    accessCheck(rect);
    int forwardProjection = rect.getXPx() - lookAheadLimit;
    for (int xPx = rect.getXPx(); xPx > forwardProjection && xPx > 0; xPx -= blockSize() ) {
        for (int yPx = rect.getYPx(); yPx < rect.getYPx() + rect.getHeightPx(); yPx += blockSize() ) {
            int xBlock = toBlock(xPx);
            int yBlock = toBlock(yPx);
            if (isSolid(xBlock, yBlock)) {
                return xBlock * blockSize() + blockSize(); // we add the blockSize here because to block returns the left starting of the block but the want the right side.
            }
        }
    }
    return 0;
}

public int getCollisionCeiling(SpriteRect rect, int lookAheadLimit){
    accessCheck(rect);
    int forwardProjection = rect.getYPx() + rect.getHeightPx() + lookAheadLimit;
    for (int yPx = rect.getYPx() + rect.getHeightPx(); yPx < forwardProjection && yPx < heightInPx() ; yPx += blockSize() ) {
        for (int xPx = rect.getXPx(); xPx < rect.getWidthPx() + rect.getXPx(); xPx += blockSize() ) {
            final int xBlock = toBlock(xPx);
            final int yBlock = toBlock(yPx);
            if (isSolid(xBlock, yBlock)) {
                return yBlock * blockSize() - rect.getHeightPx();
            }
        }
        //println(toBlock(yPx));

    }
    return heightInPx() - 1 - rect.getHeightPx();
}
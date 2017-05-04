var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var View = android.view.View;
var LinearLayout = android.widget.LinearLayout;
var PopupWindow = android.widget.PopupWindow;
var LayoutParams = android.widget.RelativeLayout.LayoutParams;
var ShapeDrawable = android.graphics.drawable.ShapeDrawable;
var Color = android.graphics.Color;
var Gravity = android.view.Gravity;
var TextView = android.widget.TextView;
var RoundRectShape = android.graphics.drawable.shapes.RoundRectShape;

var UPDATE_SPEED = 5;

var GUI;
var tvId;
var tvStatus;

var shown = false;

var timer = UPDATE_SPEED;

function modTick(){
  timer--;
  if(timer < 0){
    timer = UPDATE_SPEED;
    update();
  }
}

function ShowGui(id, status){
  ctx.runOnUiThread(new java.lang.Runnable({
    run:function(){
      try{
        if(!shown){
          var layout = new LinearLayout(ctx);
          layout.setOrientation(1);
          layout.setPadding(15,15,15,15);
        
          tvId = new TextView(ctx);
          tvStatus = new TextView(ctx);
          tvId.setTextColor(Color.WHITE);
          tvStatus.setTextColor(Color.WHITE);

          layout.addView(tvId);
          layout.addView(tvStatus);
        
          GUI = new PopupWindow(layout, 200, 
            LayoutParams.WRAP_CONTENT);
          var background = new ShapeDrawable(new 
            RoundRectShape([8,8,8,8,8,8,8,8],
            null, null));
          background.getPaint()
            .setColor(Color.DKGRAY);
          background.setAlpha(200);
          GUI.setBackgroundDrawable(background);
          GUI.showAtLocation(ctx.getWindow()
            .getDecorView(), Gravity.CENTER | 
            Gravity.TOP, 0, 50);
        }
        tvId.setText(id);
        tvStatus.setText(status);
        shown = true;
      } catch(e){
        print(e);
      }
     }
    }));
}

function HideGui(){
  ctx.runOnUiThread(new java.lang.Runnable({
    run:function(){
      shown = false;
      if(GUI != null){
        GUI.dismiss();
        GUI = null;
      } 
    }
  }));
}

function leaveGame(){
  HideGui();  
}

function update(){
  var id = "";
  var status = "";
  var entity = Player.getPointedEntity();
  var block = Player.getPointedBlockId();
  if(entity != -1){
    id = "Entity id: " + 
      Entity.getEntityTypeId(entity);
    status = "Health: " + 
      Math.round(Entity.getHealth(entity) / 
      Entity.getMaxHealth(entity) * 100) + "%";
  }
  else if(block != -1){
    id = "Block id: " + block;
  }
  if(id == "")
    HideGui();
  else
    ShowGui(id, status);
}

function continueDestroyBlock(x,y,z,side,progress) {
  ctx.runOnUiThread(new java.lang.Runnable({
    run:function(){
      try{
        if(shown){
          tvStatus.setText("Progress: " + 
            Math.round(progress * 100) + "%");
        }
      } catch(e){
        print(e)
      }
    }
  }));
}


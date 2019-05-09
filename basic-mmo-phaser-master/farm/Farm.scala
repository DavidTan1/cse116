package farm
import scala.collection.mutable.ArrayBuffer

object Farm{

  var listOfPlant: ArrayBuffer[Plant] = ArrayBuffer();

  def main(args: Array[String]): Unit = {
    var player = new Player(70, 180)

    test(player)//create a bunch of plants

    //enter number
    update(0,0, player)

    for(crop<-listOfPlant){
      println(crop.name + " is still alive. At position X: " + crop.xCoord+ " and position Y: "+ crop.yCoord)
      if(crop.water == true){
        print(" Your plant needs water")
      }
    }
    print(listOfPlant.length)
  }

  def test(player: Player): Unit = {
    for(x <- 1 to 10){

      var age = Math.floor(Math.random())*25

      var width = 50
      var height = 50

      var plant = new Plant(false, age.toInt, player, false, width+x, height+x)
      listOfPlant += plant
    }

  }

  def distanceBetween(x1: Double, y1: Double, x2: Double, y2: Double): Double = {
    val dx = x1 - x2
    val dy = y1 - y2

    return Math.sqrt(dx * dx + dy * dy)
  }



  def killPlant(user:Player, cropList: ArrayBuffer[Plant]) : Unit = {
    //you can step on your own crop and kill it

    for(crop <- cropList){
      var distance = distanceBetween(user.xCoord, user.yCoord , crop.xCoord, crop.yCoord)

      if(Math.abs(distance)==0){
        crop.death = true;
      }
    }
  }

  def waterPlant(crop: Plant, user: Player): Unit = {
    //doesn't check for left or right
    var distance = distanceBetween(user.xCoord, user.yCoord , crop.xCoord , crop.yCoord)

    //you can only water your own plant
    if(Math.abs(distance)==1 && crop.name == user){
      crop.water = false;
    }
  }

  def plantCrop(user: Player, list: ArrayBuffer[Plant]): Plant = {

    //plants plant to the left of the player
    val xC = user.xCoord + 1
    var count = 0

    for(x <- list){
      if(!(distanceBetween(xC, user.yCoord , x.xCoord , x.yCoord)==0)){
        count+=1
      }
    }

    if(count == list.length) {
      val flower = new Plant(false, 0, user, false, xC, user.yCoord)
      return flower
    }
    null
  }


  def update(x: Int, y: Int, user: Player): Unit = {

    user.xCoord = x
    user.yCoord = y

    //checks if you step on the plant after you move
    killPlant(user, listOfPlant)

    //check if you can water the plant after you move
    for(plant <- listOfPlant){
      waterPlant(plant, user)
    }

    //check if you can plant a crop after you move

    if(plantCrop(user, listOfPlant) != null){
      listOfPlant += plantCrop(user, listOfPlant)
    }
  }
}

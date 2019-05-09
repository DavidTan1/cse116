package tests

import farm.{Plant, Player, Farm}
import org.scalatest.FunSuite

import scala.collection.mutable.ArrayBuffer

class TestWaterPlant extends FunSuite{

  test("Use many test cases for each category") {

    //user2 is unable to water user plants
    val user: Player = new Player(70,180)
    val user2: Player = new Player(50,60)
    val plant: Plant = new Plant(true, 0, user, false, user.xCoord+1, user.yCoord)
    val plant2: Plant = new Plant(true, 0, user, false, 123, 55)

    Farm.waterPlant(plant, user2)
    assert(plant.water == true)

    //user is unable to water his own plant because the plant is too far away
    Farm.waterPlant(plant2, user)
    assert(plant.water == true)

    //user is able to water plant
    Farm.waterPlant(plant, user)
    assert(plant.water == false)
  }
}

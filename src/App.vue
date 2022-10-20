<script setup>

</script>

<template>
  <div class="left-content">
      <div class="timer-group">
          <img src="./assets/timer.png" alt="" srcset="">
          <input type="number" name="" id="minutes" min="00" value="00">
          <span>:</span>
          <input type="number" name="" id="seconds" min="00" max="60" value="00">
      </div>
      <div class="button-group">
          <button class="add-delete-button" id="minus-button"><i class="fa-solid fa-minus"></i></button>
          <button class="add-delete-button" id="plus-button"><i class="fa-solid fa-plus"></i></button>
          <button class="start-button green-button" id="start-button"><img src="./assets/play-button.png" alt="" srcset=""></button>
      </div>
  </div>
  <div class="right-content">
      <div class="action-group">
          <div class="download-button green-button">
              <i class="fa-solid fa-download"></i> Download logs
          </div>
          <div class="deleteall-button" onclick="deleteAll()">
              <i class="fa-regular fa-trash-can"></i> Delete all sessions
          </div>
      </div>
      <div class="table-group">
          <table class="table-data" id="#table-data">
              <tr>
                  <th>#</th>
                  <th>Started at</th>
                  <th>Duration</th>
                  <th>Notes</th>
              </tr>

          </table>
      </div>
  </div>
</template>

<style lang="scss">
  @import "./style.scss";
  
</style>

<template>
  <div>
    <h5>Coordinates {{ x }} - {{ y }}</h5>
    <div class="draw_wrapper">
      <!-- <canvas id="myCanvas" ref="canvas"></canvas> -->

      <canvas
        id="myCanvas"
        ref="myCanvas"
        @mousedown="onMouseDown($event)"
        @mousemove="onMouseMove($event)"
        @mouseup="onMouseUp($event)"
      />
      <!-- width="800px" -->
      <!-- height="800px" -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      x: 0,
      y: 0,
      isDrawing: false,
      rect: {} as DOMRect,
      ctx: {} as CanvasRenderingContext2D
      // ctx: {} as CanvasRenderingContext2D
      // canvas: this.$refs.myCanvas as HTMLCanvasElement
    };
  },
  methods: {
    onMouseDown(e: MouseEvent) {
      this.x = e.clientX - this.rect.left;
      this.y = e.clientY - this.rect.top;
      this.isDrawing = true;
      console.log("mouse dow");
      console.log(this.x, this.y);
    },
    onMouseUp(e: MouseEvent) {
      // if (this.isDrawing === true) {
      //   this.drawLine(
      //     this.x,
      //     this.y,
      //     e.clientX - this.rect.left,
      //     e.clientY - this.rect.top
      //   );
      //   this.x = 0;
      //   this.y = 0;
      //   this.isDrawing = false;
      //   console.log("mouse up");
      // }

      // this.x = e.clientX; //
      // this.y = e.clientY; //
      this.isDrawing = false;
      console.log("mouse up");
    },
    onMouseMove(e: MouseEvent) {
      if (this.isDrawing === true) {
        this.drawLine(
          this.x,
          this.y,
          e.clientX - this.rect.left,
          e.clientY - this.rect.top
        );
        this.x = e.clientX - this.rect.left;
        this.y = e.clientY - this.rect.top;
        console.log("mouse move");
      }
    },
    drawLine(x1: number, x2: number, y1: number, y2: number) {
      const canvas = this.$refs.myCanvas as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.beginPath();
      ctx.rect(x1, x2, y1, y2);
      // ctx.lineTo(x1, x2);
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";
      ctx.lineWidth = 2;
      ctx.stroke();

      // ctx.beginPath();
      // ctx.moveTo(this.x, this.y);
      // ctx.stroke();

      // ctx.beginPath();
      // ctx.strokeStyle = "black";
      // ctx.lineWidth = 1;
      // ctx.moveTo(x1, y1);
      // ctx.lineTo(x2, y2);
      // ctx.stroke();
      // ctx.closePath();
      // console.log("drawing line");
    }
  },
  // methods: {
  //   startPainting(e: MouseEvent) {
  //     this.isDrawing = true;
  //     console.log(this.isDrawing);
  //     this.draw(e);
  //   },
  //   finishedPainting() {
  //     this.isDrawing = false;
  //     console.log(this.isDrawing);
  //     this.ctx.beginPath();
  //   },
  //   draw(e: MouseEvent) {
  //     if (!this.isDrawing) return;

  //     this.ctx.lineWidth = 10;
  //     this.ctx.lineCap = "round";

  //     this.ctx.lineTo(e.clientX, e.clientY);
  //     this.ctx.stroke();

  //     this.ctx.beginPath();
  //     this.ctx.moveTo(e.clientX, e.clientY);
  //   }
  // },
  mounted() {
    const canvas = this.$refs.myCanvas as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    this.rect = canvas.getBoundingClientRect();
    this.ctx.imageSmoothingEnabled = false; // ?
    // this.ctx = ctx;

    canvas.height = this.rect.height; //!
    canvas.width = this.rect.width; //!

    // canvas.height = window.innerHeight;
    // canvas.width = window.innerWidth;
    // this.rect = canvas.getBoundingClientRect();
    // console.log("this is rect", this.rect, ctx);

    // const canvas = this.$refs.canvas as HTMLCanvasElement;
    // const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");
    // console.log(ctx);
    // this.ctx = ctx;
    // this.ctx.imageSmoothingEnabled = false;
    // this.ctx = this.$refs.canvas.getContext("2d");
    // this.ctx.lineWidth = 5;
    // this.ctx.lineCap = "round";
    // this.ctx.strokeStyle = this.color;
  }
});
</script>

<style lang="scss" scoped>
.draw_wrapper {
  display: flex;
  justify-content: center;
  #myCanvas {
    width: 70%;
    height: 50%;
    border: 0.5px solid gray;
    // box-shadow: 20px 20px 20px 20px solid #000;
  }
}
</style>

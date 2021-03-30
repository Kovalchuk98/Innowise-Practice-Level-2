<template>
  <div>
    <div class="draw_wrapper">
      <Tools
        ref="sett"
        @selectTool="select"
        @stroke="strokeValue"
        @setColor="setColor"
        @saveImgs="saveImgs"
        @clear="clear"
        @undo="undo"
        @download="downloadImg"
      />
      <canvas
        id="myCanvas"
        ref="myCanvas"
        @mousedown="onMouseDown($event)"
        @mousemove="onMouseMove($event)"
        @mouseup="onMouseUp($event)"
        width="500px"
        height="500px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";
import Tools from "@/components/Tools.vue";
import Routes from "@/router/approutes";
export default Vue.extend({
  components: {
    Tools
  },
  data() {
    return {
      tool: "brush",
      color: "black",
      pathArray: [],
      idx: -1,
      size: 3,
      x: 0,
      y: 0,
      isDrawing: false,
      rect: {} as DOMRect,
      ctx: {} as CanvasRenderingContext2D,
      canvas: {} as HTMLCanvasElement
    };
  },
  methods: {
    ...mapActions("posts", ["saveImg", "saveData"]),
    downloadImg(): void {
      const canvas = this.$refs.myCanvas as HTMLCanvasElement;
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = url;
      a.download = "unnamed";
      document.body.appendChild(a);
      a.click();
    },
    setColor(value: string): void {
      this.color = value;
    },
    select(value: string): void {
      this.tool = value;
    },
    strokeValue(value: number): void {
      this.size = value;
    },
    onMouseDown(e: MouseEvent): void {
      this.x = e.clientX - this.rect.left;
      this.y = e.clientY - this.rect.top;
      this.isDrawing = true;
      if (this.tool === "brush") {
        this.draw(e, "black");
      }
    },
    onMouseUp(e: MouseEvent): void {
      this.isDrawing = false;
      const x = e.clientX - this.rect.left;
      const y = e.clientY - this.rect.top;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineWidth = this.size;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.color;
      switch (this.tool) {
        case "rect": {
          this.ctx.rect(this.x, this.y, x - this.x, y - this.y);
          this.ctx.fillStyle = this.color;
          this.ctx.fill();
          break;
        }
        case "circle": {
          this.ctx.arc(
            this.x,
            this.y,
            Math.pow(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2), 0.5),
            0,
            Math.PI * 2,
            false
          );
          this.ctx.fillStyle = this.color;
          this.ctx.fill();
          break;
        }
        case "line": {
          this.ctx.lineTo(x, y);
          break;
        }
      }
      this.ctx.stroke();
      const preData = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      ) as never;
      this.pathArray.push(preData);
      this.idx += 1;
    },

    onMouseMove(e: MouseEvent): void {
      if (this.isDrawing) {
        if (this.tool === "brush") {
          this.draw(e, this.color);
        } else if (this.tool === "eraser") {
          this.draw(e, "#fff");
        }
      }
    },
    draw(e: MouseEvent, color: string): void {
      const x = e.clientX - this.rect.left;
      const y = e.clientY - this.rect.top;
      if (this.isDrawing) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineWidth = this.size;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = color;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.x = x;
        this.y = y;
      }
    },
    clear(): void {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.pathArray = [];
      this.idx = -1;
    },
    undo(): void {
      if (this.idx <= 0) {
        this.clear();
      } else {
        this.idx -= 1;
        this.pathArray.pop();
        this.ctx.putImageData(this.pathArray[this.idx], 1, 1);
      }
    },
    saveImgs(): void {
      const canvas = this.$refs.myCanvas as HTMLCanvasElement;
      const url = canvas.toDataURL();
      this.saveImg(url);
      this.$router.push({ path: Routes.Home });
    }
  },
  mounted() {
    const canvas = this.$refs.myCanvas as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.ctx = ctx;

    this.rect = canvas.getBoundingClientRect();
    this.ctx.imageSmoothingEnabled = false;

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
});
</script>

<style lang="scss" scoped>
.draw_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  #myCanvas {
    border: 0.5px solid gray;
    &:active {
      cursor: crosshair;
    }
  }
}
</style>

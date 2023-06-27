<script>
  let mousedown = false;
  let width = 0;
  let height = 0;
	let top = 0;
	let left = 0;
	let x = 0;
	let y = 0;


 
  function onMouseMove(event) {
    if (mousedown) {
				width = Math.abs(event.x - x);
				height = Math.abs(event.y - y);
				left = Math.min(x, event.x);
				top = Math.min(y, event.y);
    }
  }

  function onMouseDown(event) {
    mousedown = true;
    top = y = event.y;
    left = x = event.x;
  }

</script>

<svelte:window
  on:mousemove={onMouseMove}
  on:mouseup={() => mousedown = false}
  on:mousedown={onMouseDown}
/>

<div
		 class:visible={mousedown}
		 style:width="{width}px"
		 style:height="{height}px"
		 style:top="{top}px"
		 style:left="{left}px"
		 >
</div>

<style>
  div {
    position: absolute;
    display: none;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .visible {
    display: block;
  }
</style>

<script>
  import readXlsxFile from "read-excel-file";
  function onChange(event) {
    readXlsxFile(this.files[0]).then(console.log);
  }
</script>

<input type="file" on:change={onChange}/>
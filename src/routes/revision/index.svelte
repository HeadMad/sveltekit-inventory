<script>

  import { title } from "$lib/store.js";
  $title = "Ревизия";
  let data;

  const sendRequest = (operation) => async () => {
    const res =  await fetch('/api/db/' + operation + '?some=text&some=next');
    data = await res.json();
    console.log(data)
  }

</script>




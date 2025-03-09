import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function cerateCabin(newCabin) {
  // sample image url
  // https://jnlafutnfucfmysqnequ.supabase.co/storage/v1/object/public/cabin-images//cabin-003.jpg
  // https://jnlafutnfucfmysqnequ.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  // 0) get the image name
  // if there's a "/", supabase will create a folder. So, we  remove it.
  const imageName = `${Math.floor(Math.random() * 100000000)}-${
    newCabin.image.name
  }`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) create a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created.");
  }

  // 2) upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) delete an image if there was an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created."
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted.");
  }

  return data;
}

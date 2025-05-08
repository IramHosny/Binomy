import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Register() {
  const isAuth = localStorage.getItem("token");
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuth){
      navigate('/');
    }
  }, [])
  const [newuser, setnewuser] = useState({
    "nom": "",
    "prenom" :"",
    "cin":"",
    "tel":"",
    "email":"",
    "password":"",
    "gouvernorat":"",
    "institut":"",
    "age":"",
    "niveau":"",
    "adresse":"",
    "code_postal":"",
    "about":"",
    "photo":"",
    "role":"etudiant"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();

    formData.append("nom", newuser.nom);
    formData.append("prenom", newuser.prenom);
    formData.append("cin", newuser.cin);
    formData.append("tel", newuser.tel);
    formData.append("email", newuser.email);
    formData.append("password", newuser.password);
    formData.append("role", newuser.role);
    
    // Ajouter les autres champs uniquement si l'utilisateur est un étudiant
    if (newuser.role === "etudiant") {
      formData.append("gouvernorat", newuser.gouvernorat );
      formData.append("institut", newuser.institut );
      formData.append("age", newuser.age );
      formData.append("niveau", newuser.niveau );
      formData.append("adresse", newuser.adresse );
      formData.append("code_postal", newuser.code_postal );
      formData.append("about", newuser.about );
      formData.append("photo", newuser.photo );
    }
    
  
    try {
      const result = await axios.post("http://localhost:5000/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      Swal.fire({
        title: "Bien fait!",
        text: "Votre demande d'inscription a été envoyée à l'administrateur!",
        icon: "success"
      }).then(() => {
        window.location.reload(); // recharge la page
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Erreur!",
        text: error?.response?.data?.msg || "Une erreur s'est produite.",
        icon: "error"
      });
    }
  };
  

  

  return (
    <div className="isolate bg-gradient-to-tr from-blue-300 to-transparent px-6 py-24 sm:py-32 lg:px-8">
    <form style={{width:'70%',margin:'0 auto',padding:'3%'}}  onSubmit={handleSubmit}> 
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Devenir membre</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
          Pour l'inscription sur Binomy, veuillez remplir ce formulaire
          </p>

        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900"> Informations personnelles </h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="prenom"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,prenom:e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Nom
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="nom"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,nom:e.target.value})} required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Cin
              </label>
              <div className="mt-2">
                <input
                  id="cin"
                  name="cin"
                  type="number"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,cin:e.target.value})} required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Téléphone
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="tel"
                  type="number"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,tel:e.target.value})} required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email 
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,email:e.target.value})} required
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Role
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="role"
                  name="role"
                  autoComplete="role"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,role:e.target.value})} required
                >
                 <option value="" disabled selected>-- Choisissez un rôle --</option>
                <option value="etudiant">Étudiant</option>
                <option value="bailleur">Bailleur</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
            {newuser.role === "etudiant" && (
           <>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Gouvernorat
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="gouvernorat"
                  name="gouvernorat"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,gouvernorat:e.target.value})} required
                >
                  <option value="" disabled selected>-- Choisissez votre gouvernorat --</option>
                  <option value="Tunis">Tunis</option>
                  <option value="Ben Arous">Ben Arous</option>
                  <option value="Ariana">Ariana</option>
                  <option value="Mannouba">Mannouba</option>
                  <option value="Nabeul">Nabeul</option>
                  <option value="Monastir">Monastir</option>
                  <option value="Mednine">Mednine</option>
                  <option value="Bizerte">Bizerte</option>
                  <option value="Gabes">Gabes</option>
                  <option value="Beja">Beja</option>
                  <option value="Tataouine">Tataouine</option> {/* corrigé de "Tataouinr" */}
                  <option value="Zaghouan">Zaghouan</option>
                  <option value="Kasserine">Kasserine</option>
                  <option value="Jendouba">Jendouba</option>
                  <option value="Siliana">Siliana</option>
                  <option value="Sidi Bouzid">Sidi Bouzid</option>
                  <option value="Kef">Kef</option>
                  <option value="Kairouan">Kairouan</option>
                  <option value="Mahdia">Mahdia</option>
                  <option value="Gafsa">Gafsa</option>
                  <option value="Tozeur">Tozeur</option>
                  <option value="Gbelli">Gbelli</option>
                  <option value="Sfax">Sfax</option>

                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Institut
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="institut"
                  name="institut"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,institut:e.target.value})} required
                >
                  <option value="" disabled selected>-- Choisissez votre institut --</option>
                  <option value="Institut supérieur de gestion">Institut supérieur de gestion </option>
                  <option value="Institut supérieur des langues">Institut supérieur des langues</option>
                  <option value="Institut supérieur des sciences et technologies">Institut supérieur des sciences et technologies</option>
                  <option value="Institut supérieur des etudes juridiques">Institut supérieur des etudes juridiques</option>
                  <option value="Faculté des sciences">Faculté des sciences</option>
                  <option value="Ecole nationale d'ingenieurs">Ecole nationale d'ingenieurs</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
                   
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Niveau d'études
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="niveau"
                  name="niveau"
                  autoComplete="niveau"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,niveau:e.target.value})} required
                >
                 <option value="" disabled selected>-- Selectionnez votre niveau d'études --</option>
                <option value="Licence">Licence</option>
                <option value="Master">Master</option>
                <option value="Doctorat">Doctorat</option>
                <option value="Ingeniorat">Ingeniorat</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="number"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,age:e.target.value})} required
                />
              </div>
            </div>
      
            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                Adresse
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="adresse"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,adresse:e.target.value})} required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="code_postal"
                  type="number"
                  autoComplete="postal-code"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,code_postal:e.target.value})} required
                />
              </div>
            </div>
          </>)}

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                Mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="password"
                  type="password"
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(e)=>setnewuser({...newuser,password:e.target.value})} required
                />
              </div>
            </div>  

            
          </div>
        </div>
        </div>
{newuser.role === "etudiant" && (

<>
        <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                A propos
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                  onChange={(e)=>setnewuser({...newuser,about:e.target.value})} required
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Écris quelques phrases sur toi.</p>
            </div>
      
      
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


<div className="col-span-full">
  <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
  Télécharger une photo
  </label>
  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
    <div className="text-center">
      <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
      <div className="mt-4 flex text-sm/6 text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
        >
         
          <input id="file-upload" name="photo" type="file"  accept="image/*" onChange={(e)=>setnewuser({...newuser,photo:e.target.files[0]})}/>
        </label>
       
      </div>
      <p className="text-xs/5 text-gray-600">PNG, JPG, JPEG
      </p>
    </div>
  </div>
</div>
</div>
</>)}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="reset" className="text-sm/6 font-semibold text-gray-900">
          Annuler
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Valider 
        </button>
      </div>
    </form>
    </div>
  )
}


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Estatutaria.css';

const Estatutaria = () => {
  const categoriasLaborales = [
    "albanil",
    "alergologia",
    "analisisClinicos",
    "anatomiaPatologica",
    "anestesiologiayReanimacion",
    "angiologiaCirugiaVascular",
    "aparatoDigestivo",
    "arquitectoTecnico",
    "auxiliarAdministrativoFuncionAdministrativa",
    "auxiliarEnfermeria",
    "bioquimicaClinica",
    "calefactor",
    "cardiologia",
    "carpintero",
    "celador",
    "cirugiaCardiovascular",
    "cirugiaGeneralAparatoDigestivo",
    "cirugiaOralMaxilofacial",
    "cirugiaOrtopedicaTraumatologica",
    "cirugiaPediatrica",
    "cirugiaPlasticaEsteticaReparadora",
    "cirugiaToracica",
    "cocinero",
    "conductor",
    "conductorInstalaciones",
    "dermatologiaMedicoQuirurgicaVenereologia",
    "electricista",
    "endocrinologiaNutricion",
    "enfermera",
    "farmaciaHospitalaria",
    "farmacologiaClinica",
    "fisioterapeuta",
    "fontanero",
    "geriatria",
    "gobernanta",
    "grupoAdministrativoFuncionAdministrativa",
    'grupoGestionFuncionAdministrativa',
    "grupoTecnicoFuncionAdministrativa",
    "hematologiaHemoterapia",
    "ingenieroSuperior",
    "ingenieroTecnico",
    "ingenieroTecnicoIndustrial",
    "lavandera",
    "limpiador",
    "logopeda",
    "matrona",
    "mecanico",
    "medicinaDelTrabajo",
    "medicinaFamiliarComunitaria",
    "medicinaFisicaRehabilitacion",
    "medicinaIntensiva",
    "medicinaInterna",
    "medicinaNuclear",
    "medicinaPreventivaSaludPublica",
    "medicoAdmisionDocumentacionClinica",
    "medicoFamilia",
    "medicoUrgenciaHospitalaria",
    "microbiologiaParasitologia",
    "nefrologia",
    "neumologia",
    "neurocirugia",
    "neurofisiologiaClinica",
    "neurologia",
    "obstetriciaGinecologia",
    "odontoestomatologa",
    "oftalmologia",
    "oncologiaMedica",
    "oncologiaRadioterapica",
    "pediatraEquipoAtencionPrimaria",
    "pediatriaAreasEspecificas",
    "peon",
    "pinche",
    "pintor",
    "planchadora",
    "psicologiaClinica",
    "psiquiatria",
    "radiodiagnostico",
    "radiofisicaHospitalaria",
    "reumatologia",
    "tecnicoEspecialistaAnatomiaPatologica",
    "tecnicoEspecialistaDocumentacionSanitaria",
    "tecnicoEspecialistaHigieneBucodental",
    "tecnicoEspecialistaLaboratorio",
    "tecnicoEspecialistaMedicinaNuclear",
    "tecnicoEspecialistaRadiodiagnostico",
    "tecnicoEspecialistaRadioterapia",
    "tecnicoSaludPublica",
    "tecnicoSuperiorGestionServicios",
    "tecnicoTituladoMedioInformatica",
    "tecnicoTituladoSuperiorADE",
    "tecnicoTituladoSuperiorEconomico",
    "tecnicoTituladoSuperiorInformatica",
    "tecnicoTituladoSuperiorJuridico",
    "telefonista",
    "terapeutaOcupacional",
    "trabajadorSocial",
    "urologia"
  ];
  

  const [busqueda, setBusqueda] = useState('');

  const categoriasFiltradas =
    busqueda.length === 0
      ? categoriasLaborales
      : categoriasLaborales.filter((categoria) =>
          categoria.toLowerCase().includes(busqueda.toLowerCase())
        );

  // Función para formatear el nombre de la categoría para la visualización
  const formatearNombreCategoria = (categoria) => {
const formatos = {
  "albanil": "Albañil",
  "alergologia": "Alergología",
  "analisisClinicos": "Análisis Clínicos",
  "anatomiaPatologica": "Anatomía Patológica",
  "anestesiologiayReanimacion": "Anestesiología y Reanimación",
  "angiologiaCirugiaVascular": "Angiología y Cirugía Vascular",
  "aparatoDigestivo": "Aparato Digestivo",
  "arquitectoTecnico": "Arquitecto/a Técnico/a",
  "auxiliarAdministrativoFuncionAdministrativa": "Auxiliar Administrativo Función Administrativa",
  "auxiliarEnfermeria": "Auxiliar Enfermería",
  "bioquimicaClinica": "Bioquímica Clínica",
  "calefactor": "Calefactor",
  "cardiologia": "Cardiología",
  "carpintero": "Carpintero",
  "celador": "Celador",
  "cirugiaCardiovascular": "Cirugía Cardiovascular",
  "cirugiaGeneralAparatoDigestivo": "Cirugía General y Aparato Digestivo",
  "cirugiaOralMaxilofacial": "Cirugía Oral y Maxilofacial",
  "cirugiaOrtopedicaTraumatologica": "Cirugía Ortopédica y Traumatológica",
  "cirugiaPediatrica": "Cirugía Pediátrica",
  "cirugiaPlasticaEsteticaReparadora": "Cirugía Plástica, Estética y Reparadora",
  "cirugiaToracica": "Cirugía Torácica",
  "cocinero": "Cocinero/a",
  "conductor": "Conductor/a",
  "conductorInstalaciones": "Conductor/a de Instalaciones",
  "dermatologiaMedicoQuirurgicaVenereologia": "Dermatología Médico-Quirúrgica y Venereología",
  "electricista": "Electricista",
  "endocrinologiaNutricion": "Endocrinología y Nutrición",
  "enfermera": "Enfermero/a",
  "farmaciaHospitalaria": "Farmacia Hospitalaria",
  "farmacologiaClinica": "Farmacología Clínica",
  "fisioterapeuta": "Fisioterapeuta",
  "fontanero": "Fontanero",
  "geriatria": "Geriatría",
  "gobernanta": "Gobernanta",
  "grupoAdministrativoFuncionAdministrativa": "Grupo Administrativo Función Administrativa",
  "grupoGestionFuncionAdministrativa": "Grupo de Gestión de la Función Administrativa",
  "grupoTecnicoFuncionAdministrativa": "Grupo Técnico Función Administrativa",
  "hematologiaHemoterapia": "Hematología y Hemoterapia",
  "ingenieroSuperior": "Ingeniero/a Superior",
  "ingenieroTecnico": "Ingeniero Técnico",
  "ingenieroTecnicoIndustrial": "Ingeniero Técnico Industrial",
  "lavandera": "Lavandera",
  "limpiador": "Limpiador/a",
  "logopeda": "Logopeda",
  "matrona": "Matrona",
  "mecanico": "Mecánico",
  "medicinaDelTrabajo": "Medicina del Trabajo",
  "medicinaFamiliarComunitaria": "Medicina Familiar y Comunitaria",
  "medicinaFisicaRehabilitacion": "Medicina Física y Rehabilitación",
  "medicinaIntensiva": "Medicina Intensiva",
  "medicinaInterna": "Medicina Interna",
  "medicinaNuclear": "Medicina Nuclear",
  "medicinaPreventivaSaludPublica": "Medicina Preventiva y Salud Pública",
  "medicoAdmisionDocumentacionClinica": "Médico de Admisión y Documentación Clínica",
  "medicoFamilia": "Médico de Familia",
  "medicoUrgenciaHospitalaria": "Médico de Urgencia Hospitalaria",
  "microbiologiaParasitologia": "Microbiología y Parasitología",
  "nefrologia": "Nefrología",
  "neumologia": "Neumología",
  "neurocirugia": "Neurocirugía",
  "neurofisiologiaClinica": "Neurofisiología Clínica",
  "neurologia": "Neurología",
  "obstetriciaGinecologia": "Obstetricia y Ginecología",
  "odontoestomatologa": "Odontoestomatología",
  "oftalmologia": "Oftalmología",
  "oncologiaMedica": "Oncología Médica",
  "oncologiaRadioterapica": "Oncología Radioterápica",
  "pediatraEquipoAtencionPrimaria": "Pediatra de Equipo de Atención Primaria",
  "pediatriaAreasEspecificas": "Pediatría de Áreas Específicas",
  "peon": "Peón",
  "pinche": "Pinche",
  "pintor": "Pintor",
  "planchadora": "Planchadora",
  "psicologiaClinica": "Psicología Clínica",
  "psiquiatria": "Psiquiatría",
  "radiodiagnostico": "Radiodiagnóstico",
  "radiofisicaHospitalaria": "Radiofísica Hospitalaria",
  "reumatologia": "Reumatología",
  "tecnicoEspecialistaAnatomiaPatologica": "Técnico Especialista en Anatomía Patológica",
  "tecnicoEspecialistaDocumentacionSanitaria": "Técnico Especialista en Documentación Sanitaria",
  "tecnicoEspecialistaHigieneBucodental": "Técnico Especialista en Higiene Bucodental",
  "tecnicoEspecialistaLaboratorio": "Técnico Especialista de Laboratorio",
  "tecnicoEspecialistaMedicinaNuclear": "Técnico Especialista en Medicina Nuclear",
  "tecnicoEspecialistaRadiodiagnostico": "Técnico Especialista en Radiodiagnóstico",
  "tecnicoEspecialistaRadioterapia": "Técnico Especialista en Radioterapia",
  "tecnicoSaludPublica": "Técnico de Salud Pública",
  "tecnicoSuperiorGestionServicios": "Técnico Superior en Gestión de Servicios",
  "tecnicoTituladoMedioInformatica": "Técnico Titulado Medio en Informática",
  "tecnicoTituladoSuperiorADE": "Técnico Titulado Superior en ADE",
  "tecnicoTituladoSuperiorEconomico": "Técnico Titulado Superior en Económico",
  "tecnicoTituladoSuperiorInformatica": "Técnico Titulado Superior en Informática",
  "tecnicoTituladoSuperiorJuridico": "Tecnico Titulado Superior Jurídico",
  "telefonista": "Telefonista",
  "terapeutaOcupacional": "Terapeuta Ocupacional",
  "trabajadorSocial": "Trabajador Social",
  "urologia": "Urología"
};

    return formatos[categoria] || categoria;
  };

  return (
    <div className="estatutaria-container">
      <h2>Categorías Profesionales</h2>
      <input
        type="text"
        placeholder="Buscar categoría..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="search-input"
      />

      <div className="categories-container">
        {categoriasFiltradas.map((categoria, index) => (
          <Link
            key={index}
            to={`/estatutaria/categoria/${categoria}`}
            className="animated-button"
          >
            {formatearNombreCategoria(categoria)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Estatutaria;

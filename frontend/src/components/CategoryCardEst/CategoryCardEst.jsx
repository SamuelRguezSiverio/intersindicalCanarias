// CategoryCard.js
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './CategoryCardEst.css'

const CategoryCardEst = () => {
  let { categoria } = useParams()
  let navigate = useNavigate()

  const onIniciarExamen = () => {
    navigate(`/estatutaria/${categoria}`)
  }

  // Configuración basada en el grupo de la categoría
  const configuracionExamen = {
    albanil: { tiempoMax: 90, maxPreguntas: 50 },
    alergologia: { tiempoMax: 120, maxPreguntas: 100 },
    analisisClinicos: { tiempoMax: 120, maxPreguntas: 100 },
    anatomiaPatologica: { tiempoMax: 120, maxPreguntas: 100 },
    anestesiologiayReanimacion: { tiempoMax: 120, maxPreguntas: 100 },
    angiologiaCirugiaVascular: { tiempoMax: 120, maxPreguntas: 100 },
    aparatoDigestivo: { tiempoMax: 120, maxPreguntas: 100 },
    arquitectoTecnico: { tiempoMax: 120, maxPreguntas: 90 },
    auxiliarAdministrativoFuncionAdministrativa: {
      tiempoMax: 90,
      maxPreguntas: 50,
    },
    auxiliarEnfermeria: { tiempoMax: 90, maxPreguntas: 50 },
    bioquimicaClinica: { tiempoMax: 120, maxPreguntas: 100 },
    calefactor: { tiempoMax: 90, maxPreguntas: 50 },
    cardiologia: { tiempoMax: 120, maxPreguntas: 100 },
    carpintero: { tiempoMax: 90, maxPreguntas: 50 },
    celador: { tiempoMax: 90, maxPreguntas: 50 },
    cirugiaCardiovascular: { tiempoMax: 120, maxPreguntas: 100 },
    cirugiaGeneralAparatoDigestivo: { tiempoMax: 120, maxPreguntas: 100 },
    cirugiaOralMaxilofacial: { tiempoMax: 120, maxPreguntas: 100 },
    cirugiaOrtopedicaTraumatologica: { tiempoMax: 120, maxPreguntas: 100 },
    cirugiaPediatrica: { tiempoMax: 120, maxPreguntas: 100 },
    cirugiaPlasticaEsteticaReparadora: { tiempoMax: 120, maxPreguntas: 100 },
    cirugiaToracica: { tiempoMax: 120, maxPreguntas: 100 },
    cocinero: { tiempoMax: 90, maxPreguntas: 50 },
    conductor: { tiempoMax: 90, maxPreguntas: 50 },
    conductorInstalaciones: { tiempoMax: 90, maxPreguntas: 50 },
    dermatologiaMedicoQuirurgicaVenereologia: {
      tiempoMax: 120,
      maxPreguntas: 100,
    },
    electricista: { tiempoMax: 90, maxPreguntas: 50 },
    endocrinologiaNutricion: { tiempoMax: 120, maxPreguntas: 100 },
    enfermera: { tiempoMax: 120, maxPreguntas: 90 },
    farmaciaHospitalaria: { tiempoMax: 120, maxPreguntas: 100 },
    farmacologiaClinica: { tiempoMax: 120, maxPreguntas: 100 },
    fisioterapeuta: { tiempoMax: 90, maxPreguntas: 50 },
    fontanero: { tiempoMax: 90, maxPreguntas: 50 },
    geriatria: { tiempoMax: 120, maxPreguntas: 100 },
    gobernanta: { tiempoMax: 90, maxPreguntas: 50 },
    grupoAdministrativoFuncionAdministrativa: {
      tiempoMax: 90,
      maxPreguntas: 50,
    },
    grupoGestionFuncionAdministrativa: { tiempoMax: 120, maxPreguntas: 90 },
    grupoTecnicoFuncionAdministrativa: { tiempoMax: 120, maxPreguntas: 100 },
    hematologiaHemoterapia: { tiempoMax: 120, maxPreguntas: 100 },
    ingenieroSuperior: { tiempoMax: 120, maxPreguntas: 100 },
    ingenieroTecnico: { tiempoMax: 90, maxPreguntas: 50 },
    ingenieroTecnicoIndustrial: { tiempoMax: 90, maxPreguntas: 50 },
    lavandera: { tiempoMax: 90, maxPreguntas: 50 },
    limpiador: { tiempoMax: 90, maxPreguntas: 50 },
    logopeda: { tiempoMax: 90, maxPreguntas: 50 },
    matrona: { tiempoMax: 120, maxPreguntas: 100 },
    mecanico: { tiempoMax: 90, maxPreguntas: 50 },
    medicinaDelTrabajo: { tiempoMax: 120, maxPreguntas: 100 },
    medicinaFamiliarComunitaria: { tiempoMax: 120, maxPreguntas: 100 },
    medicinaFisicaRehabilitacion: { tiempoMax: 120, maxPreguntas: 100 },
    medicinaIntensiva: { tiempoMax: 120, maxPreguntas: 100 },
    medicinaInterna: { tiempoMax: 120, maxPreguntas: 100 },
    medicinaNuclear: { tiempoMax: 120, maxPreguntas: 100 },
    medicinaPreventivaSaludPublica: { tiempoMax: 120, maxPreguntas: 100 },
    medicoAdmisionDocumentacionClinica: { tiempoMax: 120, maxPreguntas: 100 },
    medicoFamilia: { tiempoMax: 120, maxPreguntas: 100 },
    medicoUrgenciaHospitalaria: { tiempoMax: 120, maxPreguntas: 100 },
    microbiologiaParasitologia: { tiempoMax: 120, maxPreguntas: 100 },
    nefrologia: { tiempoMax: 120, maxPreguntas: 100 },
    neumologia: { tiempoMax: 120, maxPreguntas: 100 },
    neurocirugia: { tiempoMax: 120, maxPreguntas: 100 },
    neurofisiologiaClinica: { tiempoMax: 120, maxPreguntas: 100 },
    neurologia: { tiempoMax: 120, maxPreguntas: 100 },
    obstetriciaGinecologia: { tiempoMax: 120, maxPreguntas: 100 },
    odontestomatologa: { tiempoMax: 120, maxPreguntas: 100 },
    oftalmologia: { tiempoMax: 120, maxPreguntas: 100 },
    oncologiaMedica: { tiempoMax: 120, maxPreguntas: 100 },
    oncologiaRadioterapica: { tiempoMax: 120, maxPreguntas: 100 },
    pediatraEquipoAtencionPrimaria: { tiempoMax: 120, maxPreguntas: 100 },
    pediatriaAreasEspecificas: { tiempoMax: 120, maxPreguntas: 100 },
    peon: { tiempoMax: 90, maxPreguntas: 50 },
    pinche: { tiempoMax: 90, maxPreguntas: 50 },
    pintor: { tiempoMax: 90, maxPreguntas: 50 },
    planchadora: { tiempoMax: 90, maxPreguntas: 50 },
    psicologiaClinica: { tiempoMax: 120, maxPreguntas: 100 },
    psiquiatria: { tiempoMax: 120, maxPreguntas: 100 },
    radiodiagnostico: { tiempoMax: 120, maxPreguntas: 100 },
    radiofisicaHospitalaria: { tiempoMax: 120, maxPreguntas: 100 },
    reumatologia: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoEspecialistaAnatomiaPatologica: {
      tiempoMax: 120,
      maxPreguntas: 100,
    },
    tecnicoEspecialistaDocumentacionSanitaria: {
      tiempoMax: 120,
      maxPreguntas: 100,
    },
    tecnicoEspecialistaHigieneBucodental: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoEspecialistaLaboratorio: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoEspecialistaMedicinaNuclear: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoEspecialistaRadiodiagnostico: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoEspecialistaRadioterapia: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoSaludPublica: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoSuperiorGestionServicios: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoTituladoMedioInformatica: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoTituladoSuperiorADE: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoTituladoSuperiorEconomico: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoTituladoSuperiorInformatica: { tiempoMax: 120, maxPreguntas: 100 },
    tecnicoTituladoSuperiorJuridico: { tiempoMax: 120, maxPreguntas: 100 },
    telefonista: { tiempoMax: 90, maxPreguntas: 50 },
    terapeutaOcupacional: { tiempoMax: 120, maxPreguntas: 100 },
    trabajadorSocial: { tiempoMax: 120, maxPreguntas: 90 },
    urologia: { tiempoMax: 120, maxPreguntas: 100 },
  }

  // Función para formatear el nombre de la categoría para la visualización
  const formatearNombreCategoria = (categoria) => {
    const formatos = {
      albanil: 'Albañil',
      alergologia: 'Alergología',
      analisisClinicos: 'Análisis Clínicos',
      anatomiaPatologica: 'Anatomía Patológica',
      anestesiologiayReanimacion: 'Anestesiología y Reanimación',
      angiologiaCirugiaVascular: 'Angiología y Cirugía Vascular',
      aparatoDigestivo: 'Aparato Digestivo',
      arquitectoTecnico: 'Arquitecto/a Técnico/a',
      auxiliarAdministrativoFuncionAdministrativa:
        'Auxiliar Administrativo Función Administrativa',
      auxiliarEnfermeria: 'Auxiliar Enfermería',
      bioquimicaClinica: 'Bioquímica Clínica',
      calefactor: 'Calefactor',
      cardiologia: 'Cardiología',
      carpintero: 'Carpintero',
      celador: 'Celador',
      cirugiaCardiovascular: 'Cirugía Cardiovascular',
      cirugiaGeneralAparatoDigestivo: 'Cirugía General y Aparato Digestivo',
      cirugiaOralMaxilofacial: 'Cirugía Oral y Maxilofacial',
      cirugiaOrtopedicaTraumatologica: 'Cirugía Ortopédica y Traumatológica',
      cirugiaPediatrica: 'Cirugía Pediátrica',
      cirugiaPlasticaEsteticaReparadora:
        'Cirugía Plástica, Estética y Reparadora',
      cirugiaToracica: 'Cirugía Torácica',
      cocinero: 'Cocinero/a',
      conductor: 'Conductor/a',
      conductorInstalaciones: 'Conductor/a de Instalaciones',
      dermatologiaMedicoQuirurgicaVenereologia:
        'Dermatología Médico-Quirúrgica y Venereología',
      electricista: 'Electricista',
      endocrinologiaNutricion: 'Endocrinología y Nutrición',
      enfermera: 'Enfermero/a',
      farmaciaHospitalaria: 'Farmacia Hospitalaria',
      farmacologiaClinica: 'Farmacología Clínica',
      fisioterapeuta: 'Fisioterapeuta',
      fontanero: 'Fontanero',
      geriatria: 'Geriatría',
      gobernanta: 'Gobernanta',
      grupoAdministrativoFuncionAdministrativa:
        'Grupo Administrativo Función Administrativa',
      grupoGestionFuncionAdministrativa:
        'Grupo de Gestión de la Función Administrativa',
      grupoTecnicoFuncionAdministrativa: 'Grupo Técnico Función Administrativa',
      hematologiaHemoterapia: 'Hematología y Hemoterapia',
      ingenieroSuperior: 'Ingeniero/a Superior',
      ingenieroTecnico: 'Ingeniero Técnico',
      ingenieroTecnicoIndustrial: 'Ingeniero Técnico Industrial',
      lavandera: 'Lavandera',
      limpiador: 'Limpiador/a',
      logopeda: 'Logopeda',
      matrona: 'Matrona',
      mecanico: 'Mecánico',
      medicinaDelTrabajo: 'Medicina del Trabajo',
      medicinaFamiliarComunitaria: 'Medicina Familiar y Comunitaria',
      medicinaFisicaRehabilitacion: 'Medicina Física y Rehabilitación',
      medicinaIntensiva: 'Medicina Intensiva',
      medicinaInterna: 'Medicina Interna',
      medicinaNuclear: 'Medicina Nuclear',
      medicinaPreventivaSaludPublica: 'Medicina Preventiva y Salud Pública',
      medicoAdmisionDocumentacionClinica:
        'Médico de Admisión y Documentación Clínica',
      medicoFamilia: 'Médico de Familia',
      medicoUrgenciaHospitalaria: 'Médico de Urgencia Hospitalaria',
      microbiologiaParasitologia: 'Microbiología y Parasitología',
      nefrologia: 'Nefrología',
      neumologia: 'Neumología',
      neurocirugia: 'Neurocirugía',
      neurofisiologiaClinica: 'Neurofisiología Clínica',
      neurologia: 'Neurología',
      obstetriciaGinecologia: 'Obstetricia y Ginecología',
      odontestomatologa: 'Odontestomatología',
      oftalmologia: 'Oftalmología',
      oncologiaMedica: 'Oncología Médica',
      oncologiaRadioterapica: 'Oncología Radioterápica',
      pediatraEquipoAtencionPrimaria: 'Pediatra de Equipo de Atención Primaria',
      pediatriaAreasEspecificas: 'Pediatría de Áreas Específicas',
      peon: 'Peón',
      pinche: 'Pinche',
      pintor: 'Pintor',
      planchadora: 'Planchadora',
      psicologiaClinica: 'Psicología Clínica',
      psiquiatria: 'Psiquiatría',
      radiodiagnostico: 'Radiodiagnóstico',
      radiofisicaHospitalaria: 'Radiofísica Hospitalaria',
      reumatologia: 'Reumatología',
      tecnicoEspecialistaAnatomiaPatologica:
        'Técnico Especialista en Anatomía Patológica',
      tecnicoEspecialistaDocumentacionSanitaria:
        'Técnico Especialista en Documentación Sanitaria',
      tecnicoEspecialistaHigieneBucodental:
        'Técnico Especialista en Higiene Bucodental',
      tecnicoEspecialistaLaboratorio: 'Técnico Especialista de Laboratorio',
      tecnicoEspecialistaMedicinaNuclear:
        'Técnico Especialista en Medicina Nuclear',
      tecnicoEspecialistaRadiodiagnostico:
        'Técnico Especialista en Radiodiagnóstico',
      tecnicoEspecialistaRadioterapia: 'Técnico Especialista en Radioterapia',
      tecnicoSaludPublica: 'Técnico de Salud Pública',
      tecnicoSuperiorGestionServicios:
        'Técnico Superior en Gestión de Servicios',
      tecnicoTituladoMedioInformatica: 'Técnico Titulado Medio en Informática',
      tecnicoTituladoSuperiorADE: 'Técnico Titulado Superior en ADE',
      tecnicoTituladoSuperiorEconomico:
        'Técnico Titulado Superior en Económico',
      tecnicoTituladoSuperiorInformatica:
        'Técnico Titulado Superior en Informática',
      tecnicoTituladoSuperiorJuridico: 'Tecnico Titulado Superior Jurídico',
      telefonista: 'Telefonista',
      terapeutaOcupacional: 'Terapeuta Ocupacional',
      trabajadorSocial: 'Trabajador Social',
      urologia: 'Urología',
    }
    return formatos[categoria] || categoria
  }

  // Obtener la configuración para la categoría actual
  const { tiempoMax, maxPreguntas } = configuracionExamen[categoria] || {
    tiempoMax: 0,
    maxPreguntas: 0,
  }

  return (
    <div className="category-card">
      <h2>{formatearNombreCategoria(categoria)}</h2>
      <h4>
        Recuerda que dispones de un tiempo de "{tiempoMax} minutos" para la
        realización de un cuestionario de "{maxPreguntas} preguntas". <br />
        ¡Ánimo y a por ello!
      </h4>
      <button onClick={onIniciarExamen}>Iniciar Examen</button>
    </div>
  )
}

export default CategoryCardEst

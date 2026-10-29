"use client";

import { useFormState } from "react-dom";
import { guardarSeccionInicio } from "@/app/admin/acciones/inicio";
import BotonEnviar from "./BotonEnviar";
import { AvisoError, AvisoExito } from "./Aviso";
import { CampoTextarea, CampoTexto } from "./Campos";

const estadoInicial = { ok: null, error: null, mensaje: null };

export default function FormularioSeccionInicio({ seccion }) {
  const [estado, formAction] = useFormState(
    guardarSeccionInicio,
    estadoInicial
  );

  return (
    <form action={formAction} className="space-y-6">
      {seccion?.id ? <input type="hidden" name="id" value={seccion.id} /> : null}

      {estado?.error ? <AvisoError>{estado.error}</AvisoError> : null}
      {estado?.ok ? <AvisoExito>{estado.mensaje}</AvisoExito> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <CampoTexto
          name="etiqueta_superior"
          label="Etiqueta superior"
          defaultValue={seccion?.etiqueta_superior}
          required
          maxLength={200}
          placeholder="MARKETING DIGITAL · DISEÑO · ESTRATEGIA"
        />
        <CampoTexto
          name="texto_boton_principal"
          label="Texto del botón principal"
          defaultValue={seccion?.texto_boton_principal}
          required
          maxLength={120}
          placeholder="QUIERO ESCALAR MI MARCA"
        />
      </div>

      <CampoTextarea
        name="titulo_principal"
        label="Título principal"
        defaultValue={seccion?.titulo_principal}
        required
        rows={7}
        maxLength={600}
        help="Puedes usar saltos de línea. **texto** se muestra en naranja y __texto__ en amarillo."
        placeholder={"Potenciamos tu\n**presencia**\ndigital con\ndiseño y __estrategia__"}
      />

      <CampoTextarea
        name="texto_descripcion"
        label="Texto descriptivo"
        defaultValue={seccion?.texto_descripcion}
        rows={3}
        maxLength={2500}
        help="Este texto se mostrará debajo del título en la sección de inicio."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <CampoTexto
          name="url_boton_principal"
          label="URL del botón principal"
          defaultValue={seccion?.url_boton_principal || "#contacto"}
          maxLength={2000}
          placeholder="#contacto"
          help="Acepta rutas internas (/), anclas (#) o URLs https://."
        />
        <CampoTexto
          name="texto_boton_secundario"
          label="Texto del botón secundario"
          defaultValue={seccion?.texto_boton_secundario}
          maxLength={120}
          placeholder="Ver tu nicho"
        />
      </div>

      <CampoTexto
        name="url_boton_secundario"
        label="URL del botón secundario"
        defaultValue={seccion?.url_boton_secundario || "#nicho"}
        maxLength={2000}
        placeholder="#nicho"
      />

      <div className="flex justify-end border-t border-white/10 pt-5">
        <BotonEnviar>Guardar sección de inicio</BotonEnviar>
      </div>
    </form>
  );
}

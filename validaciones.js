document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-ingreso");
  if (!form) return;

  const tipoClienteRadios = document.querySelectorAll('input[name="tipoCliente"]');
  const camposEmpresa = document.querySelectorAll(".campo-empresa");
  const tipoDispositivo = document.getElementById("tipoDispositivo");
  const campoTipoOtro = document.getElementById("campoTipoOtro");
  const marcaSelect = document.getElementById("marca");
  const campoMarcaOtra = document.getElementById("campoMarcaOtra");
  const checkGarantia = document.getElementById("tieneGarantia");
  const campoOrdenGarantia = document.getElementById("campoOrdenGarantia");
  const checkReparacionPrevia = document.getElementById("reparacionPrevia");
  const campoReparacionPrevia = document.getElementById("campoReparacionPrevia");
  const checkModalidadRadios = document.querySelectorAll('input[name="modalidadEntrega"]');
  const campoDireccionRetiro = document.getElementById("campoDireccionRetiro");

  const descripcion = document.getElementById("descripcion");
  const descripcionContador = document.getElementById("descripcionContador");
  const reparacionPreviaTexto = document.getElementById("reparacionPreviaTexto");
  const reparacionPreviaContador = document.getElementById("reparacionPreviaContador");

  const seccionConfirmacion = document.getElementById("confirmacion");

  function limpiarErroresCampo(input) {
    if (!input) return;
    input.classList.remove("campo-error", "campo-ok");
    const padre = input.closest(".campo") || input.parentElement;
    if (!padre) return;
    const msg = padre.querySelector(".mensaje-error");
    if (msg) msg.remove();
  }

  function marcarError(input, mensaje) {
    const padre = input.closest(".campo") || input.parentElement;
    limpiarErroresCampo(input);
    input.classList.add("campo-error");
    const span = document.createElement("div");
    span.className = "mensaje-error";
    span.textContent = mensaje;
    padre.appendChild(span);
  }

  function marcarOk(input) {
    limpiarErroresCampo(input);
    input.classList.add("campo-ok");
  }

  tipoClienteRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "Empresa" && radio.checked) {
        camposEmpresa.forEach(c => c.classList.remove("oculto"));
      } else if (radio.value === "Particular" && radio.checked) {
        camposEmpresa.forEach(c => {
          c.classList.add("oculto");
          const input = c.querySelector("input");
          if (input) {
            input.value = "";
            limpiarErroresCampo(input);
          }
        });
      }
    });
  });

  tipoDispositivo.addEventListener("change", () => {
    if (tipoDispositivo.value === "Otro") {
      campoTipoOtro.classList.remove("oculto");
    } else {
      campoTipoOtro.classList.add("oculto");
      const input = document.getElementById("tipoOtro");
      input.value = "";
      limpiarErroresCampo(input);
    }
  });

  marcaSelect.addEventListener("change", () => {
    if (marcaSelect.value === "Otra") {
      campoMarcaOtra.classList.remove("oculto");
    } else {
      campoMarcaOtra.classList.add("oculto");
      const input = document.getElementById("marcaOtra");
      input.value = "";
      limpiarErroresCampo(input);
    }
  });

  checkGarantia.addEventListener("change", () => {
    if (checkGarantia.checked) {
      campoOrdenGarantia.classList.remove("oculto");
    } else {
      campoOrdenGarantia.classList.add("oculto");
      const input = document.getElementById("ordenGarantia");
      input.value = "";
      limpiarErroresCampo(input);
    }
  });

  checkReparacionPrevia.addEventListener("change", () => {
    if (checkReparacionPrevia.checked) {
      campoReparacionPrevia.classList.remove("oculto");
    } else {
      campoReparacionPrevia.classList.add("oculto");
      reparacionPreviaTexto.value = "";
      limpiarErroresCampo(reparacionPreviaTexto);
    }
  });

  checkModalidadRadios.forEach(r => {
    r.addEventListener("change", () => {
      if (r.value === "Retiro" && r.checked) {
        campoDireccionRetiro.classList.remove("oculto");
      } else if (r.value === "Local" && r.checked) {
        campoDireccionRetiro.classList.add("oculto");
        const input = document.getElementById("direccionRetiro");
        input.value = "";
        limpiarErroresCampo(input);
      }
    });
  });

  function actualizarContador(textarea, contador, max) {
    textarea.addEventListener("input", () => {
      const len = textarea.value.length;
      contador.textContent = `${len} / ${max}`;
      const porcentaje = (len / max) * 100;
      if (porcentaje >= 100) {
        contador.style.color = "red";
      } else if (porcentaje >= 80) {
        contador.style.color = "orange";
      } else {
        contador.style.color = "#555";
      }
    });
  }

  if (descripcion && descripcionContador) {
    actualizarContador(descripcion, descripcionContador, 500);
  }
  if (reparacionPreviaTexto && reparacionPreviaContador) {
    actualizarContador(reparacionPreviaTexto, reparacionPreviaContador, 300);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let errores = 0;
    let primerCampoConError = null;

    function registrarError(input, msg) {
      errores++;
      marcarError(input, msg);
      if (!primerCampoConError) {
        primerCampoConError = input;
      }
    }

    const todosInputs = form.querySelectorAll("input, select, textarea");
    todosInputs.forEach(el => {
      if (el.offsetParent !== null) {
        limpiarErroresCampo(el);
      }
    });

    const nombreCompleto = document.getElementById("nombreCompleto");
    const dni = document.getElementById("dni");
    const email = document.getElementById("email");
    const emailConfirm = document.getElementById("emailConfirm");
    const telefono = document.getElementById("telefono");
    const provincia = document.getElementById("provincia");
    const localidad = document.getElementById("localidad");
    const nombreEmpresa = document.getElementById("nombreEmpresa");
    const cuit = document.getElementById("cuit");

    const nombreVal = nombreCompleto.value.trim();
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{5,80}$/.test(nombreVal)) {
      registrarError(nombreCompleto, "Ingrese un nombre válido (solo letras y espacios, mínimo 5 caracteres).");
    } else {
      marcarOk(nombreCompleto);
    }

    if (!/^\d{7,8}$/.test(dni.value.trim())) {
      registrarError(dni, "El DNI debe tener 7 u 8 dígitos numéricos.");
    } else {
      marcarOk(dni);
    }

    const emailVal = email.value.trim();
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(emailVal)) {
      registrarError(email, "Ingrese un correo electrónico válido.");
    } else {
      marcarOk(email);
    }

    if (emailConfirm.value.trim() !== emailVal || !emailReg.test(emailConfirm.value.trim())) {
      registrarError(emailConfirm, "El correo de confirmación debe ser válido y coincidir con el correo principal.");
    } else {
      marcarOk(emailConfirm);
    }

    const telVal = telefono.value.trim();
    const soloDigitos = telVal.replace(/[^\d]/g, "");
    if (soloDigitos.length < 8) {
      registrarError(telefono, "Ingrese un teléfono con al menos 8 dígitos.");
    } else {
      marcarOk(telefono);
    }

    let tipoCliente = "";
    tipoClienteRadios.forEach(r => { if (r.checked) tipoCliente = r.value; });
    if (!tipoCliente) {
      registrarError(tipoClienteRadios[0], "Seleccione el tipo de cliente.");
    } else if (tipoCliente === "Empresa") {
      if (nombreEmpresa.closest(".campo-empresa").offsetParent !== null) {
        if (nombreEmpresa.value.trim() === "") {
          registrarError(nombreEmpresa, "Ingrese el nombre de la empresa.");
        } else {
          marcarOk(nombreEmpresa);
        }
        const cuitVal = cuit.value.trim();
        if (!/^(\d{2}-\d{8}-\d|\d{11})$/.test(cuitVal)) {
          registrarError(cuit, "Ingrese un CUIT válido (##-########-# o 11 dígitos).");
        } else {
          marcarOk(cuit);
        }
      }
    }

    if (!provincia.value) {
      registrarError(provincia, "Seleccione una provincia.");
    } else {
      marcarOk(provincia);
    }

    if (localidad.value.trim().length < 2) {
      registrarError(localidad, "Ingrese una localidad válida (mínimo 2 caracteres).");
    } else {
      marcarOk(localidad);
    }

    if (!tipoDispositivo.value) {
      registrarError(tipoDispositivo, "Seleccione el tipo de dispositivo.");
    } else {
      marcarOk(tipoDispositivo);
      if (tipoDispositivo.value === "Otro" && campoTipoOtro.offsetParent !== null) {
        const tipoOtro = document.getElementById("tipoOtro");
        if (tipoOtro.value.trim() === "") {
          registrarError(tipoOtro, "Especifique el tipo de dispositivo.");
        } else {
          marcarOk(tipoOtro);
        }
      }
    }

    if (!marcaSelect.value) {
      registrarError(marcaSelect, "Seleccione la marca.");
    } else {
      marcarOk(marcaSelect);
      if (marcaSelect.value === "Otra" && campoMarcaOtra.offsetParent !== null) {
        const marcaOtra = document.getElementById("marcaOtra");
        if (marcaOtra.value.trim() === "") {
          registrarError(marcaOtra, "Especifique la marca.");
        } else {
          marcarOk(marcaOtra);
        }
      }
    }

    const modelo = document.getElementById("modelo");
    if (modelo.value.trim().length < 2) {
      registrarError(modelo, "Ingrese un modelo válido (mínimo 2 caracteres).");
    } else {
      marcarOk(modelo);
    }

    const so = document.getElementById("so");
    if (!so.value) {
      registrarError(so, "Seleccione el sistema operativo.");
    } else {
      marcarOk(so);
    }

    if (checkGarantia.checked && campoOrdenGarantia.offsetParent !== null) {
      const ordenGarantia = document.getElementById("ordenGarantia");
      if (ordenGarantia.value.trim() === "") {
        registrarError(ordenGarantia, "Ingrese el número de orden o fecha de compra.");
      } else {
        marcarOk(ordenGarantia);
      }
    }

    const tipoProblema = document.getElementById("tipoProblema");
    const desdeCuando = document.getElementById("desdeCuando");
    if (!tipoProblema.value) {
      registrarError(tipoProblema, "Seleccione el tipo de problema.");
    } else {
      marcarOk(tipoProblema);
    }
    if (!desdeCuando.value) {
      registrarError(desdeCuando, "Seleccione desde cuándo ocurre el problema.");
    } else {
      marcarOk(desdeCuando);
    }

    const tipoFallaRadios = document.querySelectorAll('input[name="tipoFalla"]');
    let tipoFalla = "";
    tipoFallaRadios.forEach(r => { if (r.checked) tipoFalla = r.value; });
    if (!tipoFalla) {
      registrarError(tipoFallaRadios[0], "Indique si el problema es permanente o intermitente.");
    }

    const descVal = descripcion.value.trim();
    if (descVal.length < 20) {
      registrarError(descripcion, "La descripción debe tener al menos 20 caracteres.");
    } else if (descVal.length > 500) {
      registrarError(descripcion, "La descripción no puede superar los 500 caracteres.");
    } else {
      marcarOk(descripcion);
    }

    if (checkReparacionPrevia.checked && campoReparacionPrevia.offsetParent !== null) {
      const txt = reparacionPreviaTexto.value.trim();
      if (txt.length > 300) {
        registrarError(reparacionPreviaTexto, "El texto no puede superar los 300 caracteres.");
      } else {
        marcarOk(reparacionPreviaTexto);
      }
    }

    let modalidad = "";
    checkModalidadRadios.forEach(r => { if (r.checked) modalidad = r.value; });
    const direccionRetiro = document.getElementById("direccionRetiro");
    if (!modalidad) {
      registrarError(checkModalidadRadios[0], "Seleccione la modalidad de entrega.");
    } else if (modalidad === "Retiro" && campoDireccionRetiro.offsetParent !== null) {
      if (direccionRetiro.value.trim().length < 10) {
        registrarError(direccionRetiro, "Ingrese una dirección completa para el retiro (mínimo 10 caracteres).");
      } else {
        marcarOk(direccionRetiro);
      }
    }

    const presupuesto = document.getElementById("presupuesto");
    if (!presupuesto.value) {
      registrarError(presupuesto, "Seleccione un presupuesto máximo autorizado.");
    } else {
      marcarOk(presupuesto);
    }

    const prefContactoChecks = document.querySelectorAll('input[name="prefContacto"]');
    let algunoContacto = false;
    prefContactoChecks.forEach(c => { if (c.checked) algunoContacto = true; });
    if (!algunoContacto) {
      registrarError(prefContactoChecks[0], "Seleccione al menos una preferencia de contacto.");
    }

    const horario = document.getElementById("horario");
    if (!horario.value) {
      registrarError(horario, "Seleccione un horario preferido.");
    } else {
      marcarOk(horario);
    }

    const aceptaDiagnostico = document.getElementById("aceptaDiagnostico");
    const aceptaTerminos = document.getElementById("aceptaTerminos");

    if (!aceptaDiagnostico.checked) {
      registrarError(aceptaDiagnostico, "Debe aceptar el posible tiempo de diagnóstico.");
    }
    if (!aceptaTerminos.checked) {
      registrarError(aceptaTerminos, "Debe aceptar los Términos y Condiciones.");
    }

    if (errores > 0) {
      alert(`Se encontraron ${errores} error(es) en el formulario. Revise los campos marcados en rojo.`);
      if (primerCampoConError && primerCampoConError.offsetParent !== null) {
        primerCampoConError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    form.classList.add("oculto");
    if (seccionConfirmacion) {
      const nombreCliente = nombreCompleto.value.trim();
      const tipoDisp = tipoDispositivo.value || "No especificado";
      const marcaVal = marcaSelect.value === "Otra" ? document.getElementById("marcaOtra").value.trim() : marcaSelect.value;
      const modeloVal = modelo.value.trim();
      const numeroOrden = Math.floor(Math.random() * 900000) + 100000;

      seccionConfirmacion.innerHTML = `
        <h2>Ingreso registrado correctamente</h2>
        <p>Gracias, <strong>${nombreCliente}</strong>. Hemos registrado el ingreso de su equipo.</p>
        <ul>
          <li><strong>Dispositivo:</strong> ${tipoDisp}</li>
          <li><strong>Marca:</strong> ${marcaVal}</li>
          <li><strong>Modelo:</strong> ${modeloVal}</li>
          <li><strong>Modalidad de entrega:</strong> ${modalidad === "Retiro" ? "Retiro a domicilio" : "Llevar al local"}</li>
          <li><strong>Número de orden de ingreso:</strong> #${numeroOrden}</li>
        </ul>
        <p>En hasta 48 horas hábiles le enviaremos el diagnóstico a través del medio de contacto seleccionado.</p>
        <div class="form-botones">
          <a href="index.html" class="btn-primary">Volver al inicio</a>
          <button type="button" class="btn-secundario" id="btnOtroEquipo">Ingresar otro equipo</button>
        </div>
      `;
      seccionConfirmacion.classList.remove("oculto");

      const btnOtro = document.getElementById("btnOtroEquipo");
      btnOtro.addEventListener("click", () => {
        window.location.reload();
      });
    }
  });
});

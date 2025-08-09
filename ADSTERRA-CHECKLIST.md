# 🔧 Checklist de Configuración Adsterra

## ❌ Problema Actual
- **Error**: `ERR_CONNECTION_REFUSED`  
- **URL**: `https://pl27377848.profitableratecpm.com/781f85236894765a79a75ac7e8950eca/invoke.js`
- **Estado**: Script no accesible desde ninguna ubicación

## ✅ Pasos de Verificación Requeridos

### 1. **Verificar Cuenta de Adsterra**
- [ ] Iniciar sesión en tu panel de Adsterra
- [ ] Verificar que la cuenta esté activa y aprobada
- [ ] Confirmar que no hay suspensiones o restricciones

### 2. **Validar Configuración del Sitio**
- [ ] **Dominio aprobado**: ¿Está `voiceschema.site` agregado y aprobado?
- [ ] **Verificación DNS**: ¿El dominio está verificado en Adsterra?
- [ ] **Categoría del sitio**: ¿Coincide con el contenido de VoiceSchema?

### 3. **Verificar Zone ID**
- [ ] **Zone ID actual**: `781f85236894765a79a75ac7e8950eca`
- [ ] **Tipo de anuncio**: ¿Es Native Banner correcto?
- [ ] **Estado del banner**: ¿Está activo en el panel?
- [ ] **Configuración**: ¿Permite HTTP y HTTPS?

### 4. **Revisar Restricciones**
- [ ] **Geolocalización**: ¿Hay restricciones de país?
- [ ] **Tráfico mínimo**: ¿Se cumple con los requisitos?
- [ ] **Políticas**: ¿El contenido cumple términos y condiciones?

### 5. **Probar URL Manualmente**
Intentar acceder directamente a:
```
https://pl27377848.profitableratecpm.com/781f85236894765a79a75ac7e8950eca/invoke.js
```

Si no funciona, verificar:
- [ ] ¿La URL es la correcta del panel de Adsterra?
- [ ] ¿Hay algún cambio reciente en la configuración?
- [ ] ¿El banner fue actualizado o reemplazado?

## 🔄 Soluciones Alternativas Implementadas

### **Opción 1: Retry Automático**
- Sistema de reintentos (3 intentos)
- URLs múltiples (HTTP y HTTPS)
- Timeout personalizable

### **Opción 2: Fallback Content**
- Banner alternativo con branding de VoiceSchema
- Espacio reservado para futura publicidad
- Mantiene diseño consistente

### **Opción 3: Error Handling**
- Mensajes informativos para debugging
- Estado visual del sistema
- Botón manual para activar fallback

## 🚀 Próximos Pasos

1. **Revisar panel de Adsterra** usando este checklist
2. **Obtener nuevo código** si es necesario
3. **Actualizar configuración** con datos correctos
4. **Testing en producción**

## 📞 Contactar Soporte Adsterra Si:
- La URL del script sigue siendo inaccesible
- El dominio aparece como aprobado pero no funciona  
- Hay errores en el panel de control
- Se necesita reconfiguración del banner

---
**Archivo generado por Claude Code para diagnóstico de Adsterra**
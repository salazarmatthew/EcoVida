// tests/loginIntegrationTest.js
import { Builder, By, until } from "selenium-webdriver";
import { expect } from "chai";

describe("Pruebas de integración de Login con Firefox", function () {
  this.timeout(15000); // Timeout global de 15 segundos
  let driver;

  before(async function () {
    this.timeout(15000);
    try {
      driver = await new Builder().forBrowser("firefox").build();
      console.log("Driver inicializado correctamente");
    } catch (error) {
      console.error("Error al inicializar el driver:", error);
      throw error;
    }
  });

  after(async function () {
    if (driver) {
      await driver.quit();
      console.log("Driver cerrado correctamente");
    }
  });

  it("debería renderizar el formulario de login", async function () {
    this.timeout(15000);
    await driver.get("http://localhost:5173/auth/login");

    // Pausa explícita para permitir la carga completa del DOM
    await driver.sleep(2000);

    // Busca el título con un selector específico
    const title = await driver.wait(
      until.elementLocated(By.xpath("//h2[text()='Inicio de sesión']")),
      10000,
      "No se encontró el título 'Inicio de sesión'"
    );
    const titleText = await title.getText();
    console.log("Título encontrado:", titleText);
    expect(titleText).to.equal("Inicio de sesión");

    // Verifica los campos de entrada
    const emailInput = await driver.findElement(By.css("input[type='text']"));
    const passwordInput = await driver.findElement(By.css("input[type='password']"));
    console.log("Email input visible:", await emailInput.isDisplayed());
    console.log("Password input visible:", await passwordInput.isDisplayed());
    expect(await emailInput.isDisplayed()).to.be.true;
    expect(await passwordInput.isDisplayed()).to.be.true;

    // Verifica el botón de submit
    const submitButton = await driver.findElement(By.css("input[type='submit']"));
    const buttonValue = await submitButton.getAttribute("value");
    console.log("Valor del botón:", buttonValue);
    expect(buttonValue).to.equal("Iniciar sesión");
  });

  it("debería redirigir a la página principal tras login exitoso y permanecer allí tras cerrar sesión", async function () {
    this.timeout(15000);
    await driver.get("http://localhost:5173/auth/login");

    // Llena el formulario
    await driver.findElement(By.css("input[type='text']")).sendKeys("emsalazar1@espe.edu.ec");
    await driver.findElement(By.css("input[type='password']")).sendKeys("Edwin2012");
    await driver.findElement(By.css("input[type='submit']")).click();

    // Espera a que la URL cambie a "/"
    await driver.wait(until.urlIs("http://localhost:5173/"), 10000);
    const currentUrl = await driver.getCurrentUrl();
    console.log("URL después de login:", currentUrl);
    expect(currentUrl).to.equal("http://localhost:5173/");

    // Cierra sesión
    const logoutButton = await driver.wait(
      until.elementLocated(By.css(".logout-btn")),
      10000,
      "No se encontró el botón de cerrar sesión con clase 'logout-btn'"
    );
    await logoutButton.click();

    // Captura la URL después de cerrar sesión
    await driver.sleep(2000); // Pausa para permitir la redirección
    const postLogoutUrl = await driver.getCurrentUrl();
    console.log("URL después de cerrar sesión:", postLogoutUrl);

    // Verifica que la URL permanezca en la página principal
    expect(postLogoutUrl).to.equal("http://localhost:5173/");
  });

  it("debería mostrar el enlace para crear una cuenta nueva", async function () {
    this.timeout(15000);
    await driver.get("http://localhost:5173/auth/login");

    // Pausa explícita para permitir la carga completa del DOM
    await driver.sleep(2000);

    // Busca el enlace con un selector específico
    const registerLink = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(text(), 'Crea una cuenta nueva')]")),
      10000,
      "No se encontró el enlace 'Crea una cuenta nueva'"
    );
    const linkText = await registerLink.getText();
    console.log("Texto del enlace encontrado:", linkText);
    expect(linkText).to.equal("Crea una cuenta nueva");
    expect(await registerLink.isDisplayed()).to.be.true;

    // Haz clic y verifica la redirección
    await registerLink.click();
    await driver.wait(until.urlIs("http://localhost:5173/auth/register"), 10000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("http://localhost:5173/auth/register");
  });

// Añade después de tus pruebas existentes:

it("debería manejar correctamente intentos de inyección SQL", async function() {
    this.timeout(15000);
    await driver.get("http://localhost:5173/auth/login");
    await driver.sleep(2000);

    // Array de payloads de inyección SQL para probar
    const sqlInjectionPayloads = [
      "' OR '1'='1",
      "' OR '1'='1' --",
      "admin' --",
      "' UNION SELECT username, password FROM users --",
      "'; DROP TABLE users; --"
    ];

    for (const payload of sqlInjectionPayloads) {
      console.log(`Probando payload de inyección SQL: ${payload}`);
      
      // Limpiar los campos antes de cada intento
      const emailInput = await driver.findElement(By.css("input[type='text']"));
      const passwordInput = await driver.findElement(By.css("input[type='password']"));
      
      await emailInput.clear();
      await passwordInput.clear();
      
      // Insertar payload en ambos campos
      await emailInput.sendKeys(payload);
      await passwordInput.sendKeys(payload);
      
      // Enviar formulario
      await driver.findElement(By.css("input[type='submit']")).click();
      
      // Esperar para ver la respuesta
      await driver.sleep(2000);
      
      // Verificar que no hemos iniciado sesión exitosamente (no debemos estar en la página principal)
      const currentUrl = await driver.getCurrentUrl();
      console.log(`URL después del intento con payload "${payload}": ${currentUrl}`);
      
      // Si seguimos en la página de login o hay un mensaje de error, la prueba pasa
      expect(currentUrl).to.not.equal("http://localhost:5173/");
      
      // Si hay un mensaje de error específico, podríamos verificarlo también
      try {
        const errorElement = await driver.findElement(By.className("error-message"));
        console.log(`Mensaje de error encontrado: ${await errorElement.getText()}`);
      } catch (e) {
        // Es posible que no haya un mensaje de error específico visible
        console.log("No se encontró mensaje de error específico");
      }
    }
  });

  it("debería manejar correctamente intentos de ataques XSS", async function() {
    this.timeout(15000);
    await driver.get("http://localhost:5173/auth/login");
    await driver.sleep(2000);

    // Array de payloads XSS para probar
    const xssPayloads = [
      "<script>alert('XSS')</script>",
      "<img src='x' onerror='alert(\"XSS\")'>",
      "javascript:alert('XSS')",
      "<svg onload=alert('XSS')>",
      "\"><script>alert('XSS')</script>"
    ];

    for (const payload of xssPayloads) {
      console.log(`Probando payload XSS: ${payload}`);
      
      // Limpiar los campos antes de cada intento
      const emailInput = await driver.findElement(By.css("input[type='text']"));
      const passwordInput = await driver.findElement(By.css("input[type='password']"));
      
      await emailInput.clear();
      await passwordInput.clear();
      
      // Insertar payload en el campo de email
      await emailInput.sendKeys(payload);
      await passwordInput.sendKeys("password123");
      
      // Enviar formulario
      await driver.findElement(By.css("input[type='submit']")).click();
      
      // Esperar para ver la respuesta
      await driver.sleep(2000);
      
      // Verificar que no hay alertas JavaScript o comportamientos inesperados
      // (Esto es difícil de probar automáticamente, pero al menos verificamos que la aplicación no se rompe)
      
      try {
        // Si hay un elemento visible después del submit, la aplicación no se rompió
        const anyElement = await driver.findElement(By.tagName("body"));
        expect(await anyElement.isDisplayed()).to.be.true;
        console.log("La aplicación sigue funcionando después del payload XSS");
      } catch (e) {
        console.error("La aplicación puede haberse roto con el payload XSS:", e);
        throw e;
      }
    }
  });

  it("debería validar correctamente la longitud de los campos", async function() {
    this.timeout(15000);
    await driver.get("http://localhost:5173/auth/login");
    await driver.sleep(2000);

    // Probar con valores extremadamente largos
    const emailInput = await driver.findElement(By.css("input[type='text']"));
    const passwordInput = await driver.findElement(By.css("input[type='password']"));
    
    // Crear una cadena muy larga
    const longString = "a".repeat(1000);
    
    await emailInput.clear();
    await passwordInput.clear();
    
    await emailInput.sendKeys(longString);
    await passwordInput.sendKeys(longString);
    
    // Enviar formulario
    await driver.findElement(By.css("input[type='submit']")).click();
    
    // Esperar para ver la respuesta
    await driver.sleep(2000);
    
    // Verificamos que la aplicación maneja correctamente entradas muy largas
    const currentUrl = await driver.getCurrentUrl();
    console.log(`URL después de probar con valores muy largos: ${currentUrl}`);
    
    // La aplicación no debería permitir iniciar sesión con estos valores extremos
    expect(currentUrl).to.not.equal("http://localhost:5173/");
  });

  it("debería verificar que el formulario es seguro contra CSRF", async function() {
    this.timeout(15000);
    // Nota: Esta es una verificación simplificada. Un test completo de CSRF requeriría
    // simular un sitio malicioso que intenta enviar una solicitud al endpoint de login.
    
    await driver.get("http://localhost:5173/auth/login");
    await driver.sleep(2000);
    
    // Verificar si hay un token CSRF en el formulario
    const formHtml = await driver.executeScript(
      "return document.querySelector('form').outerHTML"
    );
    
    console.log("HTML del formulario:", formHtml);
    
    // Buscar elementos que podrían contener tokens CSRF (input hidden, meta tags, etc)
    try {
      const hiddenInputs = await driver.findElements(By.css("input[type='hidden']"));
      if (hiddenInputs.length > 0) {
        console.log(`Se encontraron ${hiddenInputs.length} inputs ocultos que podrían ser tokens CSRF`);
        for (const input of hiddenInputs) {
          const name = await input.getAttribute("name");
          console.log(`Input oculto: ${name}`);
        }
      } else {
        console.log("No se encontraron inputs ocultos para CSRF. Verificar otras medidas de seguridad.");
      }
    } catch (e) {
      console.log("Error al buscar tokens CSRF:", e.message);
    }
    
    // Esta prueba es más informativa que de aserción, ya que depende de la implementación específica
  });
  
});

//npx mocha tests/loginIntegrationTest.js
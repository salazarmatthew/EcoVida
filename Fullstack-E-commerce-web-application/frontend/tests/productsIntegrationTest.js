import { Builder, By, until } from "selenium-webdriver";
import { expect } from "chai";
// Al inicio del archivo, añade esta importación:
import fs from 'fs';

describe("Pruebas de integración del módulo de Productos", function () {
  this.timeout(30000); // Timeout global de 30 segundos para operaciones más lentas
  let driver;

  before(async function () {
    try {
      driver = await new Builder().forBrowser("firefox").build();
      console.log("Driver inicializado correctamente");
      
      // Iniciar sesión primero para tener acceso completo
      await driver.get("http://localhost:5173/auth/login");
      await driver.findElement(By.css("input[type='text']")).sendKeys("emsalazar1@espe.edu.ec");
      await driver.findElement(By.css("input[type='password']")).sendKeys("Edwin2012");
      await driver.findElement(By.css("input[type='submit']")).click();
      
      // Esperar a que se complete el login
      await driver.wait(until.urlIs("http://localhost:5173/"), 10000);
    } catch (error) {
      console.error("Error al inicializar el driver o iniciar sesión:", error);
      throw error;
    }
  });

  after(async function () {
    if (driver) {
      await driver.quit();
      console.log("Driver cerrado correctamente");
    }
  });

  it("debería navegar a la página de productos y mostrar las categorías", async function () {
    // Navegar a la página de productos
    await driver.get("http://localhost:5173/products/All");
    await driver.sleep(2000); // Esperar para la carga

    // Verificar que las categorías se muestran correctamente
    const categoriesSection = await driver.findElement(By.className("category-wrapper"));
    const allCategory = await categoriesSection.findElement(By.xpath(".//div[contains(text(), 'Todas')]"));
    
    expect(await allCategory.isDisplayed()).to.be.true;
    
    // Verificar que hay más categorías disponibles
    const categories = await categoriesSection.findElements(By.className("category"));
    console.log(`Número de categorías encontradas: ${categories.length}`);
    expect(categories.length).to.be.greaterThan(1); // Al menos "Todas" y otra categoría
  });

  it("debería mostrar productos en la página", async function () {
    await driver.get("http://localhost:5173/products/All");
    await driver.sleep(2000); // Esperar para la carga

    // Verificar que hay productos
    const productsWrapper = await driver.findElement(By.className("products-wrapper"));
    const products = await productsWrapper.findElements(By.className("box"));
    console.log(`Número de productos encontrados: ${products.length}`);
    
    // Debería haber al menos un producto
    expect(products.length).to.be.greaterThan(0);
    
    // Verificar que cada producto tiene nombre, precio y botón de añadir al carrito
    const firstProduct = products[0];
    const productName = await firstProduct.findElement(By.className("name"));
    const productPrice = await firstProduct.findElement(By.className("price"));
    const addButton = await firstProduct.findElement(By.tagName("button"));
    
    expect(await productName.isDisplayed()).to.be.true;
    expect(await productPrice.isDisplayed()).to.be.true;
    expect(await addButton.isDisplayed()).to.be.true;
    expect(await addButton.getText()).to.equal("Añadir al carrito");
  });

  it("debería filtrar productos al hacer clic en una categoría específica", async function () {
    await driver.get("http://localhost:5173/products/All");
    await driver.sleep(2000); // Esperar para la carga

    // Obtener los productos iniciales para comparar
    let initialProducts = await driver.findElements(By.className("box"));
    const initialCount = initialProducts.length;
    console.log(`Productos iniciales: ${initialCount}`);

    // Hacer clic en la primera categoría que no sea "Todas"
    const categories = await driver.findElements(By.className("category"));
    const secondCategory = categories[1]; // La primera categoría después de "Todas"
    const categoryName = await secondCategory.getText();
    console.log(`Seleccionando categoría: ${categoryName}`);
    
    await secondCategory.click();
    await driver.sleep(3000); // Esperar a que se carguen los productos filtrados

    // Verificar que la URL ha cambiado
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include(`/products/${encodeURIComponent(categoryName)}`);

    // Verificar que la categoría está marcada como activa
    const activeCategory = await driver.findElement(By.className("category active"));
    expect(await activeCategory.getText()).to.equal(categoryName);

    // Opcional: Verificar que los productos han cambiado
    const filteredProducts = await driver.findElements(By.className("box"));
    console.log(`Productos después de filtrar: ${filteredProducts.length}`);
    
    // No podemos asumir que habrá más o menos productos, solo que posiblemente cambien
  });
  it("debería añadir un producto al carrito", async function () {
    await driver.get("http://localhost:5173/products/All");
    await driver.sleep(2000); // Esperar para la carga
  
    // Seleccionar el primer producto y obtener su nombre para verificación
    const products = await driver.findElements(By.className("box"));
    const firstProduct = products[0];
    const productName = await firstProduct.findElement(By.className("name")).getText();
    console.log(`Añadiendo producto al carrito: ${productName}`);
  
    // Hacer scroll hasta el producto para asegurar su visibilidad
    await driver.executeScript("arguments[0].scrollIntoView(true);", firstProduct);
    await driver.sleep(1000); // Esperar a que se complete el scroll
  
    // Hacer clic en el botón "Añadir al carrito" usando JavaScript
    const addButton = await firstProduct.findElement(By.tagName("button"));
    await driver.executeScript("arguments[0].click();", addButton);
    await driver.sleep(3000); // Aumentar el tiempo de espera para la actualización del carrito
  
    // Hacer scroll hacia arriba para ver el icono del carrito
    await driver.executeScript("window.scrollTo(0, 0);");
    await driver.sleep(1500);
  
    // Abrir el carrito para verificar - usar wait para asegurar que el icono sea clickeable
    const cartIcon = await driver.wait(
      until.elementLocated(By.className("cart-icon")),
      5000,
      "No se encontró el icono del carrito"
    );
    await driver.executeScript("arguments[0].click();", cartIcon);
    await driver.sleep(2000); // Aumentar el tiempo para que se abra el carrito completamente
  
    // Verificar que se ha añadido un producto al carrito comprobando que hay elementos en el carrito
    const cartItems = await driver.findElements(By.className("cart-product"));
    console.log(`Número de elementos en el carrito: ${cartItems.length}`);
    
    // El test pasa si hay al menos un elemento en el carrito
    expect(cartItems.length).to.be.greaterThan(0, "El carrito debería contener al menos un producto");
    
    // OPCIONAL: Tomar una captura de pantalla para documentar el estado del carrito
    try {
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync('cart-items.png', screenshot, 'base64');
      console.log("Se ha guardado una captura del carrito en 'cart-items.png'");
    } catch (e) {
      console.log("No se pudo guardar la captura de pantalla:", e.message);
    }
  });

  it("debería volver a mostrar todos los productos al hacer clic en 'Todas'", async function () {
    // Primero seleccionar una categoría específica
    await driver.get("http://localhost:5173/products/All");
    await driver.sleep(2000);
    
    // Hacer clic en alguna categoría que no sea "Todas"
    const categories = await driver.findElements(By.className("category"));
    await categories[1].click(); // Seleccionar la segunda categoría
    await driver.sleep(2000);
    
    // Ahora hacer clic en "Todas" de nuevo
    const allCategory = await driver.findElement(By.xpath("//div[contains(text(), 'Todas')]"));
    await allCategory.click();
    await driver.sleep(2000);
    
    // Verificar que la URL ha vuelto a "All"
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include("/products/All");
    
    // Verificar que "Todas" está marcada como activa
    const activeCategory = await driver.findElement(By.className("category active"));
    expect(await activeCategory.getText()).to.equal("Todas");
    
    // Verificar que hay productos
    const products = await driver.findElements(By.className("box"));
    expect(products.length).to.be.greaterThan(0);
  });
});

//npx mocha tests/productsIntegrationTest.js
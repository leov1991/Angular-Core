using angular.Web.Controllers.Resources.Products;
using angular.Web.Core.Repsoitories;
using angular.Web.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace angular.Web.Controllers
{
    [Route("api/products")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class ProductsController : Controller
    {
        public IUnitOfWork _unitOfWork { get; }

        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Products
        [HttpGet()]
        public IActionResult GetProducts()
        {
            var productsFromRepo = _unitOfWork.Products.GetAllProducts();

            var products = Mapper.Map<IEnumerable<ProductDto>>(productsFromRepo);

            return Ok(products);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productFromRepo = _unitOfWork.Products.GetProductById(id);

            if (null == productFromRepo)
                return NotFound();

            var product = Mapper.Map<ProductDto>(productFromRepo);
            return Ok(productFromRepo);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] ProductForUpdateDto product)
        {
            if (null == product)
                return BadRequest();

            if (product.Name == product.Description)
                ModelState.AddModelError(nameof(ProductForCreationDto), "El nombre y la descripción no pueden ser iguales");

            if (!ModelState.IsValid)
                return new UnprocessableEntityObjectResult(ModelState);

            var productFromRepo = _unitOfWork.Products.GetProductById(id);

            if (null == productFromRepo)
                return NotFound(); // Consider doing upserting

            Mapper.Map(product, productFromRepo);

            _unitOfWork.Products.UpdateProduct(productFromRepo);

            if (!_unitOfWork.Complete())
                throw new Exception($"Error actualizando el libro {productFromRepo.Id}");

            return NoContent();
        }

        // POST: api/Products
        [HttpPost]
        public IActionResult CreateProduct(ProductForCreationDto product)
        {
            if (null == product)
                return BadRequest();

            if (product.Name == product.Description)
                ModelState.AddModelError(nameof(ProductForCreationDto), "El nombre y la descripción no pueden ser iguales");

            if (!ModelState.IsValid)
                return new UnprocessableEntityObjectResult(ModelState);

            var productEntity = Mapper.Map<Product>(product);

            _unitOfWork.Products.AddProduct(productEntity);

            if (!_unitOfWork.Complete())
                throw new Exception($"Error guardando el producto {productEntity.Id}");

            var productToReturn = Mapper.Map<ProductDto>(productEntity);

            return CreatedAtAction("GetProduct", new { id = productToReturn.Id }, productToReturn);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = _unitOfWork.Products.GetProductById(id);
            if (null == product)
                return NotFound();

            _unitOfWork.Products.DeleteProduct(product);

            if (!_unitOfWork.Complete())
                throw new Exception($"Error eliminando el poducto {id}");

            return NoContent();
        }
    }
}
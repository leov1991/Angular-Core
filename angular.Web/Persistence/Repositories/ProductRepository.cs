using angular.Web.Core.Repsoitories;
using angular.Web.Models;
using System.Collections.Generic;
using System.Linq;

namespace angular.Web.Persistence.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private AngularWebDbContext _dbContext;

        public ProductRepository(AngularWebDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddProduct(Product product)
        {
            _dbContext.Products.Add(product);
        }

        public void DeleteProduct(Product product)
        {
            _dbContext.Products.Remove(product);
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _dbContext.Products.ToList();
        }

        public Product GetProductById(int productId)
        {
            return _dbContext.Products.SingleOrDefault(p => p.Id == productId);
        }

        public bool ProductExists(int productId)
        {
            return _dbContext.Products.Any(p => p.Id == productId);
        }

        public void UpdateProduct(Product product)
        {
            _dbContext.Update(product);
        }
    }
}
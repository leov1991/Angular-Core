using angular.Web.Models;
using System.Collections.Generic;

namespace angular.Web.Core.Repsoitories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAllProducts();

        Product GetProductById(int productId);

        void AddProduct(Product product);

        bool ProductExists(int productId);

        void DeleteProduct(Product product);

        void UpdateProduct(Product product);
    }
}
using System.ComponentModel.DataAnnotations;

namespace angular.Web.Controllers.Resources.Products
{
    public abstract class ProductForManipulationDto
    {
        [Required(ErrorMessage = "El campo nombre es obligatorio.")]
        [MaxLength(100, ErrorMessage = "El nombre del producto no puede tener más de 100 caracteres")]
        public string Name { get; set; }

        [MaxLength(200, ErrorMessage = "La descripción del producto no puede tener más de 200 caracteres")]
        public string Description { get; set; }

        public decimal Price { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}
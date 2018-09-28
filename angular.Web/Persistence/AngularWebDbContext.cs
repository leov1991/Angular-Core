using angular.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace angular.Web.Persistence
{
    public class AngularWebDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public AngularWebDbContext(DbContextOptions<AngularWebDbContext> options) : base(options)
        {
        }
    }
}
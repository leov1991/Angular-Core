using angular.Web.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace angular.Web.Persistence
{
    public class AngularWebDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> Products { get; set; }

        public AngularWebDbContext(DbContextOptions<AngularWebDbContext> options) : base(options)
        {
        }
    }
}
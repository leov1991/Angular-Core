using angular.Web.Core.Repsoitories;

namespace angular.Web.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AngularWebDbContext _dbContext;

        public IProductRepository Products { get; private set; }

        public UnitOfWork(AngularWebDbContext dbContext)
        {
            _dbContext = dbContext;
            Products = new ProductRepository(_dbContext);
        }

        public bool Complete()
        {
            return (_dbContext.SaveChanges() >= 0);
        }
    }
}
namespace angular.Web.Core.Repsoitories
{
    public interface IUnitOfWork
    {
        IProductRepository Products { get; }

        bool Complete();
    }
}
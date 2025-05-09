from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsManagerOrAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Allow GET, HEAD, OPTIONS for everyone authenticated
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated

        # Allow POST, PUT, DELETE only for admin or manager
        return request.user.is_authenticated and request.user.role in ['admin', 'manager']


        

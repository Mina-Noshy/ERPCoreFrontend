export class PermissionVM 
{
  id?: number;
  parentId?: number;
  name?: string;
  url?: string;
  icon?: string;
  text?: string;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canSeeDetails?: boolean;
}

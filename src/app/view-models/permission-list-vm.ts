export class PermissionListVM 
{
  id?: number;

  groupName?: string;
  groupIcon?: string;
  groupText?: string;

  pageName?: string;
  pageIcon?: string;
  pageText?: string;
  pageUrl?: string;

  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canSeeDetails?: boolean;
}

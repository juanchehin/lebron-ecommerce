export interface IMenuStructure
{
    id: number;
    isDropDownMenu: boolean;
    description: string;
    dropDownTarget: string;
    subMenuList: string[];
}

// zaararealty.in/api/public/location/{All}
// zaararealty.in/api/public/location/{chennai}
// zaararealty.in/api/public/location/{chennai}/{Avadi}
// zaararealty.in/api/public/builder/{chennai}/{avadi}/{Mahindra Lifespaces}
// zaararealty.in/api/public/projects/{Chennai}/{MAHINDRA HAPPINEST}
// zaararealty.in/api/public/search/{trichy}

export class Urls {

 public static BASE_URL = `https://www.zaararealty.in/api/public/`;
  //public static BASE_URL = `http://localhost:81/zaararealty/public/`;
  public static BUILDER_URL = `${Urls.BASE_URL}builder/`;
  public static PROJECT_URL = `${Urls.BASE_URL}projects/`;
  public static SEARCH_URL = `${Urls.BASE_URL}search/`;
  public static CLIENT_URL = `${Urls.BASE_URL}clients`;
  public static LOCATION_URL = `${Urls.BASE_URL}location/`;
  public static LEAD_URL = `${Urls.BASE_URL}webform`;

  public static ADMIN_LOGIN = `${Urls.BASE_URL}admin/login`;
  public static ADMIN_ADD_BUILDER = `${Urls.BASE_URL}admin/addbuilder`;
  public static ADMIN_EDIT_BUILDER = `${Urls.BASE_URL}admin/editbuilder`;
  public static ADMIN_UPDATE_BUILDER = `${Urls.BASE_URL}admin/updatebuilder`;
  public static ADMIN_LIST_BUILDER = `${Urls.BASE_URL}admin/listbuilders`;
  public static ADMIN_DELETE_BUILDER = `${Urls.BASE_URL}admin/deletebuilder`;

  public static ADMIN_ADD_PROJECT = `${Urls.BASE_URL}admin/addproject`;
  public static ADMIN_EDIT_PROJECT = `${Urls.BASE_URL}admin/editproject`;
  public static ADMIN_UPDATE_PROJECT = `${Urls.BASE_URL}admin/updateproject`;
  public static ADMIN_LIST_PROJECT = `${Urls.BASE_URL}admin/listprojects`;
  public static ADMIN_DELETE_PROJECT = `${Urls.BASE_URL}admin/deleteproject`;


  public static ADMIN_ADD_AMENITIES = `${Urls.BASE_URL}admin/addamenities`;
  public static ADMIN_ADD_PRICING = `${Urls.BASE_URL}admin/addpricing`;
  public static ADMIN_ADD_GALLERY = `${Urls.BASE_URL}admin/addgallery`;
  public static ADMIN_LIST_AMENITIES = `${Urls.BASE_URL}admin/listamenities`;
  public static ADMIN_LIST_PRICING = `${Urls.BASE_URL}admin/listpricing`;
  public static ADMIN_LIST_GALLERY = `${Urls.BASE_URL}admin/listgallery`;
  public static ADMIN_DELETE_AMENITIES = `${Urls.BASE_URL}admin/deleteamenities`;
  public static ADMIN_DELETE_PRICING = `${Urls.BASE_URL}admin/deletepricing`;
  public static ADMIN_DELETE_GALLERY = `${Urls.BASE_URL}admin/deletegallery`;
  public static ADMIN_CHANGE_FAVORITE = `${Urls.BASE_URL}admin/changefavorite`;


}

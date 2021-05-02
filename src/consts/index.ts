class ModuleName {
  public static APP = 'appModule'
  public static TAG = 'tagModule'
  public static SETTING = 'settingModule'
}

class Consts {
  public static MutationKey = class {
    public static SET_COLLAPSE = ModuleName.APP + '/SET_COLLAPSE'
    public static SET_FULLSCREEN = ModuleName.APP + '/SET_FULLSCREEN'
    public static SET_FIRST_LOADED = ModuleName.APP + '/SET_FIRST_LOADED'
    public static ADD_VIEW = ModuleName.TAG + '/ADD_VIEW'
    public static REMOVE_VIEW = ModuleName.TAG + '/REMOVE_VIEW'
    public static SET_VIEW_LIST = ModuleName.TAG + '/SET_VIEW_LIST'
    public static REMOVE_RIGHT_VIEWS = ModuleName.TAG + '/REMOVE_RIGHT_VIEWS'
    public static REMOVE_OTHER_VIEWS = ModuleName.TAG + '/REMOVE_OTHER_VIEWS'
    public static REMOVE_ALL_VIEWS = ModuleName.TAG + '/REMOVE_ALL_VIEWS'
    public static ADD_CACHED_VIEW = ModuleName.TAG + '/ADD_CACHED_VIEW'
    public static REMOVE_CACHED_VIEW = ModuleName.TAG + '/REMOVE_CACHED_VIEW'
    public static SET_THEME = ModuleName.SETTING + '/SET_THEME'
    public static SET_SHOW_TAGS_VIEW = ModuleName.SETTING + '/SET_SHOW_TAGS_VIEW'
    public static SET_ASIDE_WIDTH = ModuleName.SETTING + '/SET_ASIDE_WIDTH'
  }

  public static Blog = class {
    public static BASIC_URL = 'https://blog.csdn.net/m0_46172278/article/details/'
    public static TITLE_COMMON = 'vue3.0+ts+element-plus多页签应用模板：'
  }

  public static THEME_LINK_ID = 'theme-css'
  public static THEME_LINK_LAST_ID = 'theme-last-css'
}

export default Consts

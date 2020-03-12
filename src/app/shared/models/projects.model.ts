export namespace Projects {
    export class ResponseModel {
        ID?: number;
        BID?: number;
        Project_name: string=''; // "MAHINDRA HAPPINEST"
        project_desc: string=''; // "Avadi is one of Chennai\u2019s most famous residential destinations in the Thiruvallur district in Tamil Nadu. The locality lies around 23 kilometres away from Chennai city and is encircled by several important defence institutions and establishments. The presence of the Avadi railway station on the Chennai suburban line has definitely given a fillip to the demand for quality residential property in Avadi. Connectivity to central Chennai is another factor behind the rapid growth of the Avadi property.",
        Possession_Date: string=''; // "0000-00-00"
        Launch_Date: string=''; // "0000-00-00"
        Project_location: string=''; // "Avadi"
        area:string=''; // "Chennai"
        lang_lat:string='';
        BHK:string=''; // "1 ,2 BHK"
        minbuilduparea:string=''; // "348"
        maxbuilduparea:string=''; // "453"
        minprice: string=''; // "19 L"
        total_units: string=''; // "1200"
        total_area: string=''; // "13.22 Acres"
        availability:string=''; // "New"
        Approvals:string='';
        status:string=''; // "Available"
        imgpath:string='';
        amenities: string[]; // ["Children's play area", "24 X 7 Security", "Jogging Track", "Landscaped Gardens", "Car Parking", "Lift Available", "Power Backup"]
        gallery: string[];
        pricing: [];
        builders_name: string;
        main_img: string;
        builders_spec: string;
    }

    export class SearchModel{
        Builders:SearchResponse;
        Location:SearchResponse;
        Projects:SearchResponse;

    }

    export class SearchResponse{
        response:string[] = [];
        type?:string;
    }
}

$(document).ready(function(){
  /*var dynatableParcelles = $('#parcelles').dynatable({
    features: {
      paginate: true,
      sort: true,
      pushState: false,
      search: true,
      recordCount: false,
      perPageSelect: true
    }
  }).data('dynatable');

  var dynatabletypeintervention = $('#typeintervention').dynatable({
    features: {
      paginate: true,
      sort: true,
      pushState: false,
      search: true,
      recordCount: false,
      perPageSelect: true
    }
  }).data('dynatable');*/

  // var dynatableinterventions = $('#interventions').dynatable({
  //   features: {
  //    paginate: true,
   //    sort: true,
   //    pushState: false,
   //    search: true,
   //    recordCount: false,
   //    perPageSelect: true
  //   }
  // }).data('dynatable');

  /*$('#parcelles_geo').change( function() {
    var value = $(this).val();
    if (value === "") {
      dynatableParcelles.queries.remove("geo_Parcelle");
    } else {
      dynatableParcelles.queries.add("geo_Parcelle",value);
    }
    dynatableParcelles.process();
  });*/
});

$(document).ready(function() {
    $('#interventions').DataTable( {
      "pagingType": "full_numbers",
        "language": {
            "lengthMenu": "_MENU_ enregistrements par page",
            "search": "Rechercher",
            "zeroRecords": "aucun résultat",
            // "info": "page _PAGE_ sur _PAGES_",
            "info": "_MAX_ enregistrements",
            "infoEmpty": "Pas de résultats",
            "infoFiltered": "(filtered from _MAX_ total records)",
        },
        "dom": '<"top"lip>rt<"bottom"p><"clear">'
    } );
} );
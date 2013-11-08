<?php

  /**
   * @file
   * For theming the contact region
   *
   */
?>

<?php if ($content): ?>

  <div class="lafayette-dss-modal" id="contact-modal" tabindex="-1" role="dialog" aria-labelledby="Contact Interface" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	  <h4 class="modal-title">Contact Digital Scholarship Services</h4>
        </div>
        <div class="modal-body">

          <?php print render($content); ?>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
<?php endif; ?>